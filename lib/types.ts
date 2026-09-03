// Shared types for the ISO 27001 Gap & Evidence Analyzer.

export type ControlTheme =
  | "Organizational"
  | "People"
  | "Physical"
  | "Technological";

export interface Control {
  /** Annex A:2022 reference, e.g. "A.5.1" */
  id: string;
  theme: ControlTheme;
  title: string;
  /** Original-wording paraphrase of the control's intent. Not the standard text. */
  objective: string;
}

export type Verdict = "Met" | "Partial" | "Gap" | "Not Applicable";

export interface ControlFinding {
  controlId: string;
  verdict: Verdict;
  /** 0-1 model confidence in the verdict. */
  confidence: number;
  /** Short justification for the verdict. */
  rationale: string;
  /** Verbatim supporting snippets pulled from the supplied documents. */
  evidence: Array<{ source: string; quote: string }>;
  /** Concrete next step when verdict is Partial or Gap. */
  remediation: string | null;
}

export interface AnalysisInputDoc {
  /** Display name, e.g. "Access Control Policy" */
  name: string;
  /** "policy" | "evidence" */
  kind: "policy" | "evidence";
  content: string;
}

export interface AnalysisResult {
  company: string;
  generatedAt: string;
  mode: "demo" | "live";
  model: string | null;
  documentsAnalyzed: string[];
  findings: ControlFinding[];
  summary: {
    met: number;
    partial: number;
    gap: number;
    notApplicable: number;
    coverageScore: number; // 0-100, weighted
  };
}

export interface GoldLabel {
  controlId: string;
  expectedVerdict: Verdict;
  note: string;
}
