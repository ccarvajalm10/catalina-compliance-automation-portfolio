import { NextResponse } from "next/server";
import { analyzeLive } from "@/lib/analyzer";
import { COMPANY_NAME, loadCompanyDocs } from "@/lib/company";
import { getDemoAnalysis, hasApiKey } from "@/lib/loadAnalysis";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * POST /api/analyze
 * Runs the real pipeline over the sample company when ANTHROPIC_API_KEY is set,
 * otherwise returns the committed demo fixture with a flag so the UI can say so.
 */
export async function POST() {
  if (!hasApiKey()) {
    return NextResponse.json({
      ...getDemoAnalysis(),
      note: "No ANTHROPIC_API_KEY configured on the server — returned the pre-computed demo result. Run locally with a key for a live analysis.",
    });
  }
  try {
    const result = await analyzeLive(loadCompanyDocs(), { company: COMPANY_NAME });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "analysis failed" },
      { status: 500 },
    );
  }
}
