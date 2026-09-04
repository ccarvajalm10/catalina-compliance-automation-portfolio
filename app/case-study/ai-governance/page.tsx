import type { Metadata } from "next";
import { WorkedExamplePage } from "@/components/WorkedExamplePage";
import { AI_GOVERNANCE } from "@/lib/caseContent";

export const metadata: Metadata = {
  title: "Case study 03: EU AI Act readiness for an enterprise AI use case",
  description:
    "An illustrative governed AI workflow that classifies a new AI system under the EU AI Act and maps its obligations (Articles 9, 10, 13, 14, 15, 26) into a conformity register with an owner for each. A demonstrative build, not an empirically validated result.",
};

export default function Page() {
  return <WorkedExamplePage ex={AI_GOVERNANCE} />;
}
