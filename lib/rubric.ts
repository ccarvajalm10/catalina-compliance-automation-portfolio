import type { Verdict } from "./types";

/**
 * Plain-language explanation of how the pipeline turns documents into a verdict.
 * Used on the live tool and referenced in the case study so the reasoning is
 * visible, not hidden behind a label.
 */

export const PIPELINE_STEPS: { n: number; title: string; body: string }[] = [
  {
    n: 1,
    title: "Read the document set",
    body: "The company's ISMS policies and its evidence register are loaded as plain text and tagged as policy or evidence. Nothing else is used. If it is not in the documents, the model is told it does not exist.",
  },
  {
    n: 2,
    title: "Retrieve the evidence per control",
    body: "The 93 Annex A controls are grouped by theme and sent to the model in batches, each with the full document set and the control objective. For each control the model must find and copy the exact sentence that speaks to it.",
  },
  {
    n: 3,
    title: "Classify against a fixed rubric",
    body: "The model assigns one of four verdicts using the tests below, writes a one or two sentence rationale, gives a confidence score, and proposes one remediation action for anything short of Met.",
  },
  {
    n: 4,
    title: "Validate in code",
    body: "The response is parsed defensively: unknown control IDs are rejected, a Met or Partial verdict with no supporting quote is downgraded to Gap, confidence is clamped, and any control the model skipped is added back as a Gap for a human to check.",
  },
];

export const VERDICT_RUBRIC: Record<
  Verdict,
  { test: string; needs: string; whenWrong: string }
> = {
  Met: {
    test: "The documents show the control is both defined and operating, and the model can quote a specific sentence that proves it.",
    needs: "A verbatim quote from a named document. No quote means the verdict cannot be Met.",
    whenWrong:
      "Most often too generous when a policy describes a control but there is no evidence it actually runs. A reviewer moves these to Partial.",
  },
  Partial: {
    test: "The control is addressed but with a material weakness, or it is written down with no evidence that it operates.",
    needs: "A quote showing the control is addressed, plus a rationale naming the specific gap.",
    whenWrong:
      "This is the hardest call and the largest error class. Partial versus Met is a judgement about evidence of operation, and people disagree on it too.",
  },
  Gap: {
    test: "The documents do not address the control, or they contradict it.",
    needs: "No supporting quote exists. The rationale explains what is missing.",
    whenWrong:
      "Occasionally a control is covered obliquely in a document the model did not connect. A reviewer catches this by reading the objective.",
  },
  "Not Applicable": {
    test: "The control cannot apply to this organisation given what the documents describe, for example physical-site controls for a fully remote, cloud-hosted company.",
    needs: "A written justification. A human still has to accept every exclusion and record it in the Statement of Applicability.",
    whenWrong:
      "The model proposes exclusions; it does not get to make them final. Every one is a prompt for a person to confirm.",
  },
};

export const VERDICT_ORDER: Verdict[] = ["Met", "Partial", "Gap", "Not Applicable"];
