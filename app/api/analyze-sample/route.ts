import { NextResponse } from "next/server";
import { analyzeSample, SAMPLE_CONTROL_IDS } from "@/lib/analyzer";
import { COMPANY_NAME, loadCompanyDocs } from "@/lib/company";
import { getDemoAnalysis, hasApiKey } from "@/lib/loadAnalysis";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/analyze-sample
 * Runs the real pipeline over a fixed 4-control sample when ANTHROPIC_API_KEY is
 * set on the server. Without a key it returns those same 4 controls from the
 * recorded assessment, flagged, so the button always shows a result.
 */
export async function POST() {
  const ids: string[] = [...SAMPLE_CONTROL_IDS];

  if (!hasApiKey()) {
    const demo = getDemoAnalysis();
    return NextResponse.json({
      mode: "recorded",
      model: null,
      sampleControlIds: ids,
      findings: demo.findings.filter((f) => ids.includes(f.controlId)),
      note: "No API key is configured on this server, so these are the recorded verdicts for the sample controls. Add a spending-capped ANTHROPIC_API_KEY to run them live.",
    });
  }

  try {
    const result = await analyzeSample(loadCompanyDocs(), { company: COMPANY_NAME });
    return NextResponse.json({
      mode: "live",
      model: result.model,
      sampleControlIds: ids,
      findings: result.findings,
      note: `Ran just now against ${result.model ?? "the model"}.`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "sample analysis failed" },
      { status: 500 },
    );
  }
}
