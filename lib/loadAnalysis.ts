import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AnalysisResult } from "./types";

/** The committed, pre-computed assessment shown when there is no API key. */
export function getDemoAnalysis(): AnalysisResult {
  const p = join(process.cwd(), "data", "fixtures", "analysis.json");
  return JSON.parse(readFileSync(p, "utf8")) as AnalysisResult;
}

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}
