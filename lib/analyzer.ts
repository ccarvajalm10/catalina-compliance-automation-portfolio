import Anthropic from "@anthropic-ai/sdk";
import { CONTROLS, CONTROLS_BY_ID, THEMES } from "./controls";
import type {
  AnalysisInputDoc,
  AnalysisResult,
  Control,
  ControlFinding,
  Verdict,
} from "./types";

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

const VERDICTS: Verdict[] = ["Met", "Partial", "Gap", "Not Applicable"];

/** Weights used to turn verdicts into a single 0-100 coverage score. */
const VERDICT_WEIGHT: Record<Verdict, number> = {
  Met: 1,
  Partial: 0.5,
  Gap: 0,
  "Not Applicable": 1, // excluded from denominator instead
};

export const SYSTEM_PROMPT = `You are an ISO/IEC 27001:2022 lead implementer performing a controls gap assessment.

You are given (a) a set of an organisation's ISMS documents — policies and evidence — and (b) a batch of Annex A controls with plain-language objectives.

For EACH control in the batch, decide one verdict:
- "Met"            — the supplied documents clearly establish the control is defined AND operating.
- "Partial"        — the control is addressed but with a material weakness, gap, or missing evidence of operation.
- "Gap"            — the supplied documents do not address the control, or contradict it.
- "Not Applicable" — the control cannot apply to this organisation given what the documents describe (justify why).

Rules:
- Judge ONLY from the supplied text. Do not assume controls exist because the company is "probably fine".
- Every "Met" or "Partial" verdict MUST include at least one verbatim quote copied exactly from a supplied document, with that document's name.
- If you cannot find a supporting quote, the verdict cannot be "Met".
- Keep rationale to 1-2 sentences. Keep remediation to one concrete action (null when verdict is "Met").
- confidence is your calibrated probability (0-1) that an experienced auditor would agree with your verdict.

Return ONLY a JSON object of this exact shape, no prose, no markdown fences:
{"findings":[{"controlId":"A.5.1","verdict":"Met","confidence":0.9,"rationale":"...","evidence":[{"source":"Information Security Policy","quote":"..."}],"remediation":null}]}`;

export function buildUserPrompt(
  docs: AnalysisInputDoc[],
  controls: Control[],
): string {
  const corpus = docs
    .map(
      (d) =>
        `<document name="${d.name}" kind="${d.kind}">\n${d.content.trim()}\n</document>`,
    )
    .join("\n\n");

  const controlList = controls
    .map((c) => `- ${c.id} (${c.title}): ${c.objective}`)
    .join("\n");

  return `ISMS DOCUMENTS\n${corpus}\n\nCONTROLS TO ASSESS (${controls.length})\n${controlList}\n\nReturn the JSON object now.`;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Defensive parse + validation of a model batch response. */
export function parseFindings(raw: string): ControlFinding[] {
  let text = raw.trim();
  // tolerate accidental ```json fences
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  // tolerate leading/trailing prose
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first > 0 || last < text.length - 1) text = text.slice(first, last + 1);

  const parsed = JSON.parse(text) as { findings?: unknown };
  if (!parsed || !Array.isArray(parsed.findings)) {
    throw new Error("model response missing findings[]");
  }

  return parsed.findings.map((f): ControlFinding => {
    const obj = f as Record<string, unknown>;
    const controlId = String(obj.controlId ?? "");
    if (!CONTROLS_BY_ID[controlId]) {
      throw new Error(`unknown controlId from model: ${controlId}`);
    }
    let verdict = String(obj.verdict ?? "") as Verdict;
    if (!VERDICTS.includes(verdict)) verdict = "Gap";
    const confidence = clamp01(Number(obj.confidence ?? 0.5));
    const evidence = Array.isArray(obj.evidence)
      ? (obj.evidence as Array<Record<string, unknown>>).map((e) => ({
          source: String(e.source ?? "unknown"),
          quote: String(e.quote ?? "").slice(0, 600),
        }))
      : [];
    // enforce the "Met needs a quote" rule at parse time too
    if ((verdict === "Met" || verdict === "Partial") && evidence.length === 0) {
      verdict = "Gap";
    }
    return {
      controlId,
      verdict,
      confidence,
      rationale: String(obj.rationale ?? "").slice(0, 800),
      evidence,
      remediation:
        obj.remediation == null ? null : String(obj.remediation).slice(0, 600),
    };
  });
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0.5;
  return Math.min(1, Math.max(0, n));
}

export function computeSummary(
  findings: ControlFinding[],
): AnalysisResult["summary"] {
  let met = 0,
    partial = 0,
    gap = 0,
    na = 0;
  for (const f of findings) {
    if (f.verdict === "Met") met++;
    else if (f.verdict === "Partial") partial++;
    else if (f.verdict === "Gap") gap++;
    else na++;
  }
  const scored = findings.filter((f) => f.verdict !== "Not Applicable");
  const raw = scored.reduce((s, f) => s + VERDICT_WEIGHT[f.verdict], 0);
  const coverageScore = scored.length
    ? Math.round((raw / scored.length) * 100)
    : 0;
  return { met, partial, gap, notApplicable: na, coverageScore };
}

export interface AnalyzeOptions {
  company: string;
  /** controls per model call */
  batchSize?: number;
  model?: string;
  signal?: AbortSignal;
  /** called after each batch resolves, for streaming UIs */
  onProgress?: (done: number, total: number) => void;
}

/**
 * Live analysis. Requires ANTHROPIC_API_KEY. Batches Annex A by theme so each
 * request stays small and every finding is traceable to one call.
 */
export async function analyzeLive(
  docs: AnalysisInputDoc[],
  opts: AnalyzeOptions,
): Promise<AnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  const model = opts.model || DEFAULT_MODEL;
  const client = new Anthropic({ apiKey });
  const batchSize = opts.batchSize ?? 12;

  // batch within each theme so related controls are judged together
  const batches: Control[][] = [];
  for (const theme of THEMES) {
    const inTheme = CONTROLS.filter((c) => c.theme === theme);
    batches.push(...chunk(inTheme, batchSize));
  }

  const findings: ControlFinding[] = [];
  let done = 0;
  for (const batch of batches) {
    const res = await client.messages.create(
      {
        model,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(docs, batch) }],
      },
      { signal: opts.signal },
    );
    const textBlock = res.content.find((b) => b.type === "text");
    const text = textBlock && textBlock.type === "text" ? textBlock.text : "";
    const batchFindings = parseFindings(text);
    // keep only controls we actually asked for, fill any the model dropped
    const seen = new Set(batchFindings.map((f) => f.controlId));
    for (const c of batch) {
      if (!seen.has(c.id)) {
        batchFindings.push({
          controlId: c.id,
          verdict: "Gap",
          confidence: 0.4,
          rationale: "Model did not return a verdict for this control; treated as a gap pending review.",
          evidence: [],
          remediation: "Manually assess this control.",
        });
      }
    }
    findings.push(...batchFindings.filter((f) => batch.some((c) => c.id === f.controlId)));
    done += batch.length;
    opts.onProgress?.(done, CONTROLS.length);
  }

  findings.sort((a, b) => a.controlId.localeCompare(b.controlId, undefined, { numeric: true }));

  return {
    company: opts.company,
    generatedAt: new Date().toISOString(),
    mode: "live",
    model,
    documentsAnalyzed: docs.map((d) => d.name),
    findings,
    summary: computeSummary(findings),
  };
}

/** Controls used by the public "run a live sample" button: one per theme,
 *  chosen so the sample shows a spread of likely verdicts. */
export const SAMPLE_CONTROL_IDS = ["A.5.1", "A.6.3", "A.7.4", "A.8.8"] as const;

/**
 * Live analysis of a small, fixed set of controls. Same prompt and defensive
 * parsing as the full run, in a single model call. Requires ANTHROPIC_API_KEY.
 */
export async function analyzeSample(
  docs: AnalysisInputDoc[],
  opts: { company: string; model?: string; controlIds?: readonly string[] },
): Promise<AnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  const model = opts.model || DEFAULT_MODEL;
  const ids = opts.controlIds ?? SAMPLE_CONTROL_IDS;
  const batch = ids
    .map((id) => CONTROLS_BY_ID[id])
    .filter((c): c is Control => Boolean(c));

  const client = new Anthropic({ apiKey });
  const res = await client.messages.create({
    model,
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(docs, batch) }],
  });
  const textBlock = res.content.find((b) => b.type === "text");
  const text = textBlock && textBlock.type === "text" ? textBlock.text : "";
  const parsed = parseFindings(text);
  const seen = new Set(parsed.map((f) => f.controlId));
  for (const c of batch) {
    if (!seen.has(c.id)) {
      parsed.push({
        controlId: c.id,
        verdict: "Gap",
        confidence: 0.4,
        rationale:
          "Model did not return a verdict for this control; treated as a gap pending review.",
        evidence: [],
        remediation: "Manually assess this control.",
      });
    }
  }
  const findings = parsed
    .filter((f) => batch.some((c) => c.id === f.controlId))
    .sort((a, b) => a.controlId.localeCompare(b.controlId, undefined, { numeric: true }));

  return {
    company: opts.company,
    generatedAt: new Date().toISOString(),
    mode: "live",
    model,
    documentsAnalyzed: docs.map((d) => d.name),
    findings,
    summary: computeSummary(findings),
  };
}
