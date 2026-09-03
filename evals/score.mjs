/**
 * Scores an analysis result against the hand-labelled gold set (evals/gold.jsonl).
 *
 *   node evals/score.mjs                       # scores the committed demo fixture (baseline)
 *   node evals/score.mjs path/to/result.json   # scores a saved analysis result (e.g. a live run)
 *
 * Reports per-verdict precision / recall / F1, overall accuracy, a "collapsed"
 * accuracy that treats Met/Partial/Gap on a 3-point severity scale (so a
 * Partial-vs-Met miss counts as a near miss), and a confusion matrix.
 *
 * `npm run eval:live` runs the real pipeline first, then calls this.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const VERDICTS = ["Met", "Partial", "Gap", "Not Applicable"];
const SEVERITY = { Met: 2, Partial: 1, Gap: 0, "Not Applicable": null };

const resultPath = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(ROOT, "data", "fixtures", "analysis.json");

const isFixture = resultPath.endsWith(join("fixtures", "analysis.json"));

const gold = readFileSync(join(__dirname, "gold.jsonl"), "utf8")
  .split("\n")
  .filter(Boolean)
  .map((l) => JSON.parse(l));

const result = JSON.parse(readFileSync(resultPath, "utf8"));
const byId = Object.fromEntries(result.findings.map((f) => [f.controlId, f]));

let exact = 0;
let sevAbsErr = 0;
let sevPairs = 0;
const confusion = {}; // expected -> { predicted -> count }
for (const v of VERDICTS) confusion[v] = Object.fromEntries(VERDICTS.map((x) => [x, 0]));
const perVerdict = Object.fromEntries(
  VERDICTS.map((v) => [v, { tp: 0, fp: 0, fn: 0 }]),
);
const misses = [];

for (const g of gold) {
  const pred = byId[g.controlId];
  if (!pred) {
    console.error(`result is missing control ${g.controlId}`);
    process.exit(1);
  }
  const exp = g.expectedVerdict;
  const got = pred.verdict;
  confusion[exp][got]++;

  if (exp === got) {
    exact++;
    perVerdict[exp].tp++;
  } else {
    perVerdict[exp].fn++;
    perVerdict[got].fp++;
    misses.push({ id: g.controlId, expected: exp, got, conf: pred.confidence, note: g.note });
  }

  if (SEVERITY[exp] != null && SEVERITY[got] != null) {
    sevAbsErr += Math.abs(SEVERITY[exp] - SEVERITY[got]);
    sevPairs++;
  }
}

const n = gold.length;
const accuracy = exact / n;
const collapsedAcc = sevPairs ? 1 - sevAbsErr / (sevPairs * 2) : null;

function f1(v) {
  const { tp, fp, fn } = perVerdict[v];
  const p = tp + fp ? tp / (tp + fp) : 0;
  const r = tp + fn ? tp / (tp + fn) : 0;
  const f = p + r ? (2 * p * r) / (p + r) : 0;
  return { p, r, f, support: tp + fn };
}

const pct = (x) => (x * 100).toFixed(1).padStart(5) + "%";

const lines = [];
lines.push(`# Eval: verdict accuracy vs gold set`);
lines.push("");
lines.push(`- Result scored: \`${process.argv[2] ?? "data/fixtures/analysis.json (demo fixture — baseline)"}\``);
lines.push(`- Mode: **${result.mode}**${result.model ? ` (\`${result.model}\`)` : ""}`);
lines.push(`- Gold labels: ${n} controls (\`evals/gold.jsonl\`)`);
lines.push(`- Generated: ${new Date().toISOString()}`);
lines.push("");
if (isFixture) {
  lines.push(
    `> ⚠️ This run scores the **hand-authored reference fixture**, which shares an author with the gold set, ` +
      `so it is a consistency check and an upper bound — not a measure of model performance. ` +
      `Run \`npm run eval:live\` (needs \`ANTHROPIC_API_KEY\`) for a real model score.`,
  );
  lines.push("");
}
lines.push(`## Method`);
lines.push("");
lines.push(`Gold labels are ${n} Annex A controls hand-labelled from the sample company's documents`);
lines.push(`by the project author, each with a justification. **Exact accuracy** is the strict metric.`);
lines.push(`**Severity-collapsed accuracy** maps Met/Partial/Gap to 2/1/0, so a Partial-vs-Met slip is`);
lines.push(`a half-miss and a Met-vs-Gap is a full miss — closer to the real reviewing cost. The miss`);
lines.push(`table lists every disagreement so failures can be inspected, not averaged away.`);
lines.push("");
lines.push(`## Headline`);
lines.push("");
lines.push(`| Metric | Value |`);
lines.push(`|---|---|`);
lines.push(`| Exact verdict accuracy | **${pct(accuracy)}** (${exact}/${n}) |`);
lines.push(`| Severity-collapsed accuracy (Met/Partial/Gap on a 0–2 scale) | **${collapsedAcc == null ? "n/a" : pct(collapsedAcc)}** |`);
lines.push("");
lines.push(`## Per-verdict`);
lines.push("");
lines.push(`| Verdict | Precision | Recall | F1 | Support |`);
lines.push(`|---|--:|--:|--:|--:|`);
for (const v of VERDICTS) {
  const { p, r, f, support } = f1(v);
  if (support === 0 && perVerdict[v].fp === 0) continue;
  lines.push(`| ${v} | ${pct(p)} | ${pct(r)} | ${pct(f)} | ${support} |`);
}
lines.push("");
lines.push(`## Confusion matrix (rows = expected, cols = predicted)`);
lines.push("");
lines.push(`| exp \\ pred | ${VERDICTS.map((v) => v.replace("Not Applicable", "N/A")).join(" | ")} |`);
lines.push(`|---|${VERDICTS.map(() => "--:").join("|")}|`);
for (const e of VERDICTS) {
  const row = VERDICTS.map((p) => {
    const c = confusion[e][p];
    return e === p && c ? `**${c}**` : String(c);
  });
  lines.push(`| ${e.replace("Not Applicable", "N/A")} | ${row.join(" | ")} |`);
}
lines.push("");
if (misses.length) {
  lines.push(`## Misses (${misses.length})`);
  lines.push("");
  lines.push(`| Control | Expected | Got | Conf | Why the gold label is what it is |`);
  lines.push(`|---|---|---|--:|---|`);
  for (const m of misses) {
    lines.push(`| ${m.id} | ${m.expected} | ${m.got} | ${m.conf.toFixed(2)} | ${m.note} |`);
  }
} else {
  lines.push(`## Misses`);
  lines.push("");
  lines.push(`None — every gold label matched.`);
}
lines.push("");

const report = lines.join("\n");
console.log(report);

const outPath = join(__dirname, isFixture ? "REPORT.baseline.md" : "REPORT.md");
writeFileSync(outPath, report + "\n");
console.log(`\nWritten to ${outPath.replace(ROOT + "/", "").replace(ROOT + "\\", "")}`);
