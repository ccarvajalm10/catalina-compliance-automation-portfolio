"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PIPELINE_STEPS, VERDICT_RUBRIC, VERDICT_ORDER } from "@/lib/rubric";
import type { AnalysisResult, Control, ControlFinding, Verdict } from "@/lib/types";

const THEMES = ["Organizational", "People", "Physical", "Technological"] as const;

const badgeClass: Record<Verdict, string> = {
  Met: "badge-met",
  Partial: "badge-partial",
  Gap: "badge-gap",
  "Not Applicable": "badge-na",
};

function csv(rows: (string | number)[][]): string {
  return rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell ?? "");
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(","),
    )
    .join("\r\n");
}

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const el = document.createElement("a");
  el.href = url;
  el.download = name;
  el.click();
  URL.revokeObjectURL(url);
}

type SampleState = {
  mode: "live" | "recorded";
  model: string | null;
  note?: string;
  findings: ControlFinding[];
};

export default function ToolClient({
  initial,
  controls,
  liveEnabled,
}: {
  initial: AnalysisResult;
  controls: Control[];
  liveEnabled: boolean;
}) {
  const [result] = useState<AnalysisResult>(initial);
  const [showHow, setShowHow] = useState(false);

  // live sample
  const [samplePhase, setSamplePhase] = useState<"idle" | "running" | "done" | "error">("idle");
  const [sample, setSample] = useState<SampleState | null>(null);
  const [sampleErr, setSampleErr] = useState<string | null>(null);

  const [verdictFilter, setVerdictFilter] = useState<Verdict | "All">("All");
  const [themeFilter, setThemeFilter] = useState<(typeof THEMES)[number] | "All">("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const ctl = useMemo(
    () => Object.fromEntries(controls.map((c) => [c.id, c])),
    [controls],
  );

  const rows = useMemo(() => {
    return result.findings
      .map((f) => ({ f, c: ctl[f.controlId] }))
      .filter(({ f, c }) => {
        if (verdictFilter !== "All" && f.verdict !== verdictFilter) return false;
        if (themeFilter !== "All" && c?.theme !== themeFilter) return false;
        if (q) {
          const hay =
            `${f.controlId} ${c?.title ?? ""} ${f.rationale} ${f.remediation ?? ""}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      });
  }, [result, ctl, verdictFilter, themeFilter, q]);

  async function runSample() {
    setSamplePhase("running");
    setSampleErr(null);
    try {
      const res = await fetch("/api/analyze-sample", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setSampleErr(data.error);
        setSamplePhase("error");
        return;
      }
      setSample({
        mode: data.mode,
        model: data.model ?? null,
        note: data.note,
        findings: data.findings ?? [],
      });
      setSamplePhase("done");
    } catch (e) {
      setSampleErr(e instanceof Error ? e.message : "request failed");
      setSamplePhase("error");
    }
  }

  const s = result.summary;

  return (
    <div className="container-x py-10" data-accent="forest">
      {/* header */}
      <div>
        <p className="kicker on-accent">Live tool · Case study 01</p>
        <h1 className="display mt-2 text-[clamp(1.7rem,3vw,2.3rem)]">
          {result.company}: Annex A gap assessment
        </h1>
        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[var(--ink-2)]">
          This is the finished output of the case-study pipeline: a drafted verdict for all{" "}
          {result.findings.length} ISO/IEC 27001:2022 Annex A controls of a sample company,
          each traceable to a sentence in its documents. Filter it, open any control for the
          decision trace, or run a live sample below.{" "}
          <Link href="/case-study/iso-27001" className="font-semibold text-[var(--forest)]">
            How it was built and measured →
          </Link>
        </p>
      </div>

      {/* live sample */}
      <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[13px] font-semibold">Run a live sample</div>
            <div className="mt-0.5 text-[12.5px] text-[var(--ink-2)]">
              Four controls (A.5.1, A.6.3, A.7.4, A.8.8), one model call.{" "}
              {liveEnabled
                ? "This server has a key, so the button calls the model."
                : "No key on this server yet, so it returns the recorded verdicts for those four."}
            </div>
          </div>
          <button
            className="btn btn-accent"
            onClick={runSample}
            disabled={samplePhase === "running"}
          >
            {samplePhase === "running" ? "Running…" : samplePhase === "done" ? "Run again" : "Run live sample"}
          </button>
        </div>

        {samplePhase === "error" && (
          <p className="mt-3 text-[13px] text-[var(--v-gap)]">Sample run failed: {sampleErr}</p>
        )}

        {sample && samplePhase === "done" && (
          <div className="mt-4">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-semibold ${
                sample.mode === "live"
                  ? "bg-[var(--v-met-bg)] text-[var(--v-met)]"
                  : "bg-[var(--v-partial-bg)] text-[var(--v-partial)]"
              }`}
            >
              {sample.mode === "live" ? "● Live model run" : "● Recorded result"}
              {sample.note ? <span className="font-normal">{sample.note}</span> : null}
            </div>
            <ul className="divide-y divide-[var(--line)] rounded-xl border border-[var(--line)]">
              {sample.findings.map((f) => (
                <li key={f.controlId} className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <span className={`badge ${badgeClass[f.verdict]} mt-0.5`}>{f.verdict}</span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold">
                        {f.controlId}. {ctl[f.controlId]?.title ?? ""}
                      </div>
                      <div className="mt-1 text-[12.5px] text-[var(--ink-2)]">{f.rationale}</div>
                      {f.evidence[0] && (
                        <div className="quote mt-1.5 text-[12px]">
                          {f.evidence[0].quote}
                          <span className="not-italic text-[var(--ink-3)]"> ({f.evidence[0].source})</span>
                        </div>
                      )}
                    </div>
                    <span className="ml-auto shrink-0 text-[11.5px] text-[var(--ink-3)]">
                      conf {f.confidence.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* how it works */}
      <div className="mt-6 card-flat overflow-hidden">
        <button
          className="flex w-full items-center justify-between px-5 py-3.5 text-left"
          onClick={() => setShowHow((v) => !v)}
        >
          <span className="text-[14px] font-semibold">How the AI reaches a verdict</span>
          <span className="text-[var(--ink-3)]">{showHow ? "Hide" : "Show"}</span>
        </button>
        {showHow && (
          <div className="border-t border-[var(--line)] px-5 py-5">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PIPELINE_STEPS.map((p) => (
                <li key={p.n}>
                  <div className="text-[13px] font-bold text-[var(--forest)]">Step {p.n}</div>
                  <div className="mt-0.5 text-[13.5px] font-semibold">{p.title}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--ink-2)]">{p.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl bg-[var(--paper-2)] p-4">
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-3)]">
                The four verdicts
              </div>
              <dl className="mt-3 space-y-3">
                {VERDICT_ORDER.map((v) => (
                  <div key={v} className="grid gap-1 sm:grid-cols-[110px_1fr]">
                    <dt>
                      <span className={`badge ${badgeClass[v]}`}>{v}</span>
                    </dt>
                    <dd className="text-[13px] leading-relaxed text-[var(--ink-2)]">
                      {VERDICT_RUBRIC[v].test}{" "}
                      <span className="text-[var(--ink-3)]">Needs: {VERDICT_RUBRIC[v].needs}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>

      {/* summary */}
      <div className="mt-6 card grid grid-cols-2 gap-px overflow-hidden bg-[var(--line)] sm:grid-cols-5">
        {[
          ["Coverage", `${s.coverageScore}/100`, "dot-na"],
          ["Met", s.met, "dot-met"],
          ["Partial", s.partial, "dot-partial"],
          ["Gap", s.gap, "dot-gap"],
          ["N/A", s.notApplicable, "dot-na"],
        ].map(([label, val, dot]) => (
          <div key={label as string} className="bg-[var(--surface)] px-5 py-4">
            <div className="flex items-center gap-2 text-[11.5px] text-[var(--ink-3)]">
              <span className={`dot ${dot}`} /> {label}
            </div>
            <div className="mt-1 font-serif text-[26px]">{val as string}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search control, rationale, action"
          className="w-full max-w-xs rounded-lg border border-[var(--line-2)] bg-[var(--surface)] px-3.5 py-2 text-[13.5px] outline-none focus:border-[var(--ink-3)]"
        />
        <select
          value={verdictFilter}
          onChange={(e) => setVerdictFilter(e.target.value as Verdict | "All")}
          className="rounded-lg border border-[var(--line-2)] bg-[var(--surface)] px-3 py-2 text-[13.5px]"
        >
          <option value="All">All verdicts</option>
          {VERDICT_ORDER.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value as (typeof THEMES)[number] | "All")}
          className="rounded-lg border border-[var(--line-2)] bg-[var(--surface)] px-3 py-2 text-[13.5px]"
        >
          <option value="All">All themes</option>
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <span className="text-[13px] text-[var(--ink-3)]">{rows.length} shown</span>

        <div className="ml-auto flex gap-2">
          <button
            className="btn btn-ghost py-2! text-[12.5px]!"
            onClick={() =>
              download("analysis.json", JSON.stringify(result, null, 2), "application/json")
            }
          >
            Export JSON
          </button>
          <button
            className="btn btn-ghost py-2! text-[12.5px]!"
            onClick={() =>
              download(
                "remediation-backlog.csv",
                csv([
                  ["Control", "Title", "Verdict", "Confidence", "Action"],
                  ...result.findings
                    .filter((f) => f.verdict === "Partial" || f.verdict === "Gap")
                    .map((f) => [
                      f.controlId,
                      ctl[f.controlId]?.title ?? "",
                      f.verdict,
                      f.confidence.toFixed(2),
                      f.remediation ?? "",
                    ]),
                ]),
                "text/csv",
              )
            }
          >
            Export backlog
          </button>
          <button
            className="btn btn-ghost py-2! text-[12.5px]!"
            onClick={() =>
              download(
                "statement-of-applicability-draft.csv",
                csv([
                  ["Control", "Title", "Theme", "Applicable", "Status", "Justification"],
                  ...result.findings.map((f) => {
                    const c = ctl[f.controlId];
                    const applicable = f.verdict !== "Not Applicable";
                    return [
                      f.controlId,
                      c?.title ?? "",
                      c?.theme ?? "",
                      applicable ? "Yes" : "No",
                      f.verdict === "Met"
                        ? "Implemented"
                        : f.verdict === "Partial"
                          ? "Partially implemented"
                          : f.verdict === "Gap"
                            ? "Not implemented"
                            : "Excluded",
                      applicable ? f.rationale : `Excluded: ${f.rationale}`,
                    ];
                  }),
                ]),
                "text/csv",
              )
            }
          >
            Export SoA draft
          </button>
        </div>
      </div>

      {/* findings */}
      <ul className="mt-4 card divide-y divide-[var(--line)] overflow-hidden">
        {rows.map(({ f, c }) => {
          const isOpen = open === f.controlId;
          return (
            <li key={f.controlId}>
              <button
                className="flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-black/[0.015]"
                onClick={() => setOpen(isOpen ? null : f.controlId)}
              >
                <span className={`badge ${badgeClass[f.verdict]} mt-0.5`}>{f.verdict}</span>
                <span className="min-w-0 flex-1">
                  <span className="text-[13.5px] font-semibold">
                    {f.controlId}. {c?.title ?? ""}
                  </span>
                  <span className="ml-2 text-[11.5px] text-[var(--ink-3)]">{c?.theme}</span>
                  <span className="mt-1 block text-[13px] text-[var(--ink-2)]">{f.rationale}</span>
                </span>
                <span className="mt-0.5 shrink-0 text-[11.5px] text-[var(--ink-3)]">
                  conf {f.confidence.toFixed(2)}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[var(--line)] bg-[var(--paper-2)]/60 px-5 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-3)]">
                    Decision trace
                  </div>
                  <dl className="mt-2 space-y-2.5 text-[13px]">
                    <div>
                      <dt className="font-semibold">Control objective</dt>
                      <dd className="text-[var(--ink-2)]">{c?.objective}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Test applied for &ldquo;{f.verdict}&rdquo;</dt>
                      <dd className="text-[var(--ink-2)]">{VERDICT_RUBRIC[f.verdict].test}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">What the model found in the documents</dt>
                      <dd>
                        {f.evidence.length > 0 ? (
                          <ul className="mt-1 space-y-1.5">
                            {f.evidence.map((e, i) => (
                              <li key={i} className="quote text-[12.5px]">
                                {e.quote}
                                <span className="not-italic text-[var(--ink-3)]"> ({e.source})</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-[var(--ink-2)]">
                            No supporting statement was found in the supplied documents.
                          </span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Model rationale</dt>
                      <dd className="text-[var(--ink-2)]">{f.rationale}</dd>
                    </div>
                    {f.remediation && (
                      <div>
                        <dt className="font-semibold">Recommended action</dt>
                        <dd className="text-[var(--ink-2)]">{f.remediation}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="font-semibold">Confidence</dt>
                      <dd className="text-[var(--ink-2)]">
                        {f.confidence.toFixed(2)}. Reflects how directly the documents support
                        this verdict. {VERDICT_RUBRIC[f.verdict].whenWrong}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </li>
          );
        })}
        {rows.length === 0 && (
          <li className="px-5 py-10 text-center text-[13px] text-[var(--ink-3)]">
            No controls match those filters.
          </li>
        )}
      </ul>

      <p className="mt-4 text-[12.5px] text-[var(--ink-3)]">
        This is a reviewed draft, not a certification result. It does not replace an
        assessor, an internal audit, or a certification body.{" "}
        <Link href="/case-study/iso-27001" className="font-semibold text-[var(--forest)]">
          Read how it was built and measured.
        </Link>
      </p>
    </div>
  );
}
