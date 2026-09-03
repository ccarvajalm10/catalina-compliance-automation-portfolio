# From Regulation to Workflow — portfolio

The applied companion to the MSc thesis *From Regulation to Workflow: A Framework for
Responsible AI Implementation in Legal Operations and Compliance Functions*
(MSc in Law, Data and AI, EMILDAI). The thesis argues that responsible AI in
legal-compliance work comes from building governance into the workflow itself, not from
adding features after deployment. This site puts that framework into practice on three
processes: an ISO/IEC 27001 gap analysis, a GDPR Data Processing Agreement review, and an
EU AI Act readiness assessment. Each is an illustrative implementation, assessed against
the external legal requirements it targets.

The ISO 27001 case has a working tool behind it: a demonstration that AI can compress the
first Annex A gap analysis from roughly four analyst-days to about one, without giving up
traceability or handing judgement to a model.

It is one deployable [Next.js](https://nextjs.org) app with three things in it:

| Route | What it is |
|---|---|
| `/` | Portfolio landing page: the pitch, the numbers, how it works |
| `/tool` | **The live tool.** The full 93-control assessment of a sample company, filterable by verdict and theme, with JSON / remediation-backlog / draft-SoA exports and a "run live" button |
| `/case-study` | A written before/after of the process change, including how the time figures are derived and where the tool is weak |

Plus an **evaluation harness** (`evals/`) that scores the pipeline against a hand-labelled
gold set on every change.

---

## Why this exists

A first ISO 27001 readiness assessment means reading a dozen policies and an evidence
register, then forming a defensible verdict on all 93 Annex A:2022 controls
(implemented, partial, not implemented, or out of scope) with the evidence for each.
From scratch that is about four analyst-days, the Met/Partial line drifts with fatigue,
and the output rarely cites the sentence that justified each verdict.

This tool does the **first pass**: it drafts a cited verdict for every control so a human
*reviews* 93 pre-argued findings instead of authoring them. The [case study](./app/case-study)
is explicit that the saving is in authoring, not judgement. The reviewer still makes every
final call.

---

## Architecture

```
ISMS documents (policies + evidence register, markdown)
        │
        ▼
lib/company.ts ──► lib/analyzer.ts
                   • batches the 93 controls by Annex A theme (8 batches)
                   • each batch → Claude with the full document corpus + strict rules:
                       - Met/Partial MUST carry a verbatim quote from a named doc
                       - every Partial/Gap MUST carry one remediation action
                       - per-verdict confidence
                   • parseFindings(): defensive validation
                       - unknown control IDs rejected
                       - unquoted passes downgraded to Gap
                       - dropped controls back-filled as Gap for human review
        │
        ▼
AnalysisResult (JSON)  ──►  /tool UI  +  exports (JSON, backlog CSV, SoA CSV)
        │
        ▼
evals/score.mjs  ──►  precision / recall / F1 per verdict, confusion matrix, miss list
```

Key files:

- [`lib/controls.ts`](./lib/controls.ts): the 93-control catalogue. **Original paraphrased
  objectives only**; the copyrighted ISO/IEC 27001 / 27002 text is never stored or reproduced.
- [`lib/analyzer.ts`](./lib/analyzer.ts): prompt construction, batching, and the defensive parser.
- [`lib/types.ts`](./lib/types.ts): the shared result shape.
- [`data/company/northwind/`](./data/company/northwind): the fictional sample company's
  ISMS documents, written for this project with realistic gaps built in.
- [`data/fixtures/analysis.json`](./data/fixtures): the pre-computed result used in demo mode.
- [`evals/gold.jsonl`](./evals/gold.jsonl): 30 hand-labelled controls with justifications.

---

## Running it

Requires Node 20+.

```bash
npm install
npm run dev          # http://localhost:3000  (works with no API key, demo mode)
```

### Demo mode vs live mode

- **No `ANTHROPIC_API_KEY`:** the app serves the committed assessment in
  `data/fixtures/analysis.json`. Everything renders; "Run live analysis" returns that same
  result with a note.
- **With a key** (`cp .env.example .env`, add the key): `/api/analyze` and
  `npm run eval:live` call the model for real. The pipeline uses the model id in
  `ANTHROPIC_MODEL` (default `claude-sonnet-5`).

### Rebuild the demo fixture

```bash
npm run fixture      # regenerates data/fixtures/analysis.json and verifies every
                     # evidence quote is a real substring of a source document
```

---

## Evaluation

```bash
npm run eval         # scores the reference fixture against the gold set (consistency
                     # check, expected ~100%, it shares an author with the gold set)

npm run eval:live    # runs the real pipeline, then scores THAT against the gold set
                     # (writes evals/REPORT.md)
```

The report gives:

- **Exact verdict accuracy**, the strict metric.
- **Severity-collapsed accuracy:** Met/Partial/Gap as 2/1/0, so a Partial-vs-Met slip is a
  half-miss and a Met-vs-Gap a full miss (closer to the real reviewing cost).
- **Per-verdict precision / recall / F1** and a **confusion matrix**.
- A **miss table:** every disagreement with the gold rationale, so failures are inspected,
  not averaged away.

The known weak spot is the Partial-vs-Implemented boundary when evidence of *operation*
(not just *existence*) is thin, which is exactly why the human review step is not optional.

---

## Deploying

Deploys to Vercel as-is. `next.config.mjs` uses `outputFileTracingIncludes` so the `data/`
markdown and fixture are bundled with the serverless functions that read them. Set
`ANTHROPIC_API_KEY` in the Vercel project only if you want the deployed site to run live
analyses; otherwise it stays in demo mode, which is the safe default for a public URL.

---

## Making the portfolio yours

Edit [`lib/site.ts`](./lib/site.ts): name, role, intro, links, credentials. Nothing else
needs to change.

---

## Scope and honesty

- The output is a **reviewed draft**. It does not replace an assessor, an internal audit, or
  a certification body, and says so wherever it appears.
- The sample company, its documents, and the assessment are **fictional**.
- Real ISMS documents are sensitive: live use needs a data-processing agreement with the
  model provider and a decision on what may leave your environment.
- Time figures: the four-day baseline is a standard effort estimate, not a measured control;
  the one-day after figure is model runtime (minutes) plus about 5 to 6 hours of analyst
  review. The [case study](./app/case-study) shows the breakdown.

## Licence

MIT, see [LICENSE](./LICENSE). Applies to the code and the original control-objective
paraphrases and sample documents in this repo. It does **not** grant any rights in the
ISO/IEC standards themselves.
