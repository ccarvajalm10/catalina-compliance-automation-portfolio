import type { Metadata } from "next";
import { WorkedExamplePage } from "@/components/WorkedExamplePage";
import { DPA_REVIEW } from "@/lib/caseContent";

export const metadata: Metadata = {
  title: "Case study 02: Data Processing Agreement review, governed end to end",
  description:
    "An illustrative governed AI workflow for pre-signature DPA review against GDPR Article 28(3), Article 32 and Chapter V: retrieval grounding, a review skill, an evaluator loop, and a lawyer approval gate. A demonstrative build, not an empirically validated result.",
};

export default function Page() {
  return <WorkedExamplePage ex={DPA_REVIEW} />;
}
