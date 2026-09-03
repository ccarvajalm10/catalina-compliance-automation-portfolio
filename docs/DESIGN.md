# Design notes

Short version of the decisions behind the pipeline — the things worth being able to talk
through in an interview.

## 1. The prompt makes citations mandatory, not optional

The system prompt (`lib/analyzer.ts`, `SYSTEM_PROMPT`) states that an `Implemented` or
`Partial` verdict **must** include a verbatim quote copied from a supplied document, and
that "if you cannot find a supporting quote, the verdict cannot be Met". This turns the
model's job from *opinion* into *evidence retrieval + classification*, which is:

- easier to review — a reviewer checks a quote against a doc instead of re-deriving a verdict;
- harder to fake — a hallucinated pass usually fails the "is this quote actually in the doc"
  check;
- the same shape an auditor expects — finding, evidence, conclusion.

## 2. Validation is a code layer, not trust

`parseFindings()` assumes the model output is hostile:

- strips accidental ```` ```json ```` fences and surrounding prose;
- rejects any `controlId` not in the catalogue;
- clamps `confidence` to `[0,1]`;
- **downgrades `Met`/`Partial` with an empty `evidence[]` to `Gap`** — the citation rule is
  re-enforced here even if the model ignored it;
- back-fills any control the model dropped from a batch as a `Gap` with low confidence and a
  "needs manual review" note, so the result always has exactly 93 findings.

## 3. Batching by Annex A theme

Controls are sent in 8 batches grouped by theme (Organizational / People / Physical /
Technological) rather than all 93 at once or one-at-a-time:

- related controls are judged together, so the model is consistent across e.g. the access
  control family;
- each request stays small enough for reliable structured output;
- every finding is traceable to exactly one model call for debugging;
- a failed batch loses 12 controls, not the whole run.

## 4. Coverage score

`computeSummary()` weights `Met = 1`, `Partial = 0.5`, `Gap = 0`, and **excludes
`Not Applicable` from the denominator** (an out-of-scope control should not drag the score
down). It is a management-summary number, not an audit result.

## 5. Demo mode is a first-class path

The committed `data/fixtures/analysis.json` means the repo runs, the site deploys, and the
tool is usable with zero configuration and zero API spend. The live path is the *same UI and
same result shape* — `analyzeLive()` produces the exact `AnalysisResult` the fixture holds —
so nothing about the demo misrepresents the real thing.

## 6. Evaluation is separate from the fixture

`evals/gold.jsonl` is labelled independently from the fixture's rationales. `npm run eval`
against the fixture is a **consistency check** (expected ~100%). `npm run eval:live` against
a real model run is the number that actually means something, and it writes a miss table so
the failure modes are visible.
