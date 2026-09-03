/**
 * Runs the real analysis pipeline against the sample company and writes the
 * result to .eval/live-result.json. Requires ANTHROPIC_API_KEY.
 *
 *   npx tsx scripts/run-live.ts
 *   # or: npm run eval:live   (runs this, then scores it against the gold set)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeLive } from "../lib/analyzer";
import { COMPANY_NAME, loadCompanyDocs } from "../lib/company";

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add a key.");
    process.exit(1);
  }
  const docs = loadCompanyDocs();
  console.log(`Analyzing ${COMPANY_NAME} — ${docs.length} documents, 93 controls...`);
  const t0 = Date.now();
  const result = await analyzeLive(docs, {
    company: COMPANY_NAME,
    onProgress: (done, total) => process.stdout.write(`\r  ${done}/${total} controls`),
  });
  process.stdout.write("\n");
  const secs = ((Date.now() - t0) / 1000).toFixed(1);

  mkdirSync(join(process.cwd(), ".eval"), { recursive: true });
  writeFileSync(
    join(process.cwd(), ".eval", "live-result.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
  const s = result.summary;
  console.log(
    `Done in ${secs}s — Met ${s.met} / Partial ${s.partial} / Gap ${s.gap} / N/A ${s.notApplicable}, ` +
      `coverage ${s.coverageScore}/100`,
  );
  console.log("Wrote .eval/live-result.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
