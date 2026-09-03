import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { AnalysisInputDoc } from "./types";

const ROOT = join(process.cwd(), "data", "company", "northwind");

export const COMPANY_NAME = "Northwind Cloud Ltd";

export const COMPANY_PROFILE = `Northwind Cloud Ltd is a fictional 60-person B2B SaaS company that runs a multi-tenant
cloud analytics platform on AWS (eu-west-1). It is remote-first with a small London office
and is preparing for its first ISO/IEC 27001:2022 certification audit. The ISMS document
set below was written for this project and deliberately contains realistic gaps.`;

function loadDir(sub: "policies" | "evidence", kind: AnalysisInputDoc["kind"]) {
  const dir = join(ROOT, sub);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const content = readFileSync(join(dir, file), "utf8");
      const firstHeading = content.match(/^#\s+(.+)$/m);
      const name = firstHeading ? firstHeading[1].trim() : file.replace(/\.md$/, "");
      return { name, kind, content } satisfies AnalysisInputDoc;
    });
}

let cache: AnalysisInputDoc[] | null = null;

/** All ISMS documents for the sample company (policies + evidence register). */
export function loadCompanyDocs(): AnalysisInputDoc[] {
  if (!cache) cache = [...loadDir("policies", "policy"), ...loadDir("evidence", "evidence")];
  return cache;
}
