/**
 * Structured content for the two worked-example case studies (DPA review,
 * AI Act readiness). Kept here so the page files stay about layout.
 *
 * These are ILLUSTRATIVE implementations, not empirical validations. Each
 * workflow is assessed against externally established legal requirements
 * (GDPR, EU AI Act), not against internally defined success criteria.
 */

import type { FlowStep } from "@/components/Flow";

export type CheckStatus = "pass" | "flag" | "fail";

export type SampleCheck = {
  ref: string;
  requirement: string;
  status: CheckStatus;
  finding: string;
  cite: string;
};

export type WorkedExample = {
  slug: string;
  accent: "clay" | "indigo";
  area: string;
  title: string;
  /** one-line "pain the AI solves, with a number" */
  metric: { before: string; after: string; headline: string };
  /** the process, in one paragraph */
  process: string;
  /** why it is slow today */
  problem: string[];
  /** what the governed AI workflow changes */
  change: string[];
  /** the workflow as a diagram spec */
  flow: FlowStep[];
  /** what each governance component is *for* */
  governance: { title: string; body: string }[];
  /** the canned sample the "run" button reveals */
  sample: {
    inputLabel: string;
    inputName: string;
    steps: string[];
    checks: SampleCheck[];
    verdict: string;
  };
  /** method behind the time numbers */
  method: string[];
  /** honest weaknesses */
  weak: string[];
  /** where the same architecture extends */
  extends: string;
};

/* ========================================================================== */
/* Case 02 — Data Processing Agreement review                                  */
/* ========================================================================== */

export const DPA_REVIEW: WorkedExample = {
  slug: "dpa-review",
  accent: "clay",
  area: "Privacy & Data Protection",
  title: "Data Processing Agreement review, governed end to end",
  metric: {
    before: "~90 min / agreement",
    after: "~20 min review",
    headline:
      "In this build, a review that would take about 90 minutes becomes a check of about 20.",
  },
  process:
    "Before a controller signs a contract with a vendor that will process personal data, someone in the legal or privacy team reads the Data Processing Agreement and confirms it carries every term the GDPR requires: the mandatory processing clauses in Article 28(3), security obligations that meet Article 32, and lawful handling of any transfer outside the EEA under Chapter V. The output is a redline and a short recommendation to the business.",
  problem: [
    "Each agreement is 8 to 15 pages and the required terms are scattered through it, cross-referenced, and worded differently by every vendor.",
    "It is repetitive judgement work: the same ten or so questions asked against slightly different drafting, dozens of times a quarter.",
    "Under time pressure a reviewer skims, and a missing sub-processor flow-down clause or a transfer with no safeguard is exactly what gets missed.",
  ],
  change: [
    "A reusable DPA review skill encodes the organisation's playbook: the Article 28(3) checklist, the security floor, and the contractual red lines, as explicit inspectable rules rather than something each reviewer holds in their head.",
    "A retrieval step grounds the review in three sources only: the organisation's playbook, the text of the relevant GDPR articles, and the agreement under review. Every observation cites retrieved material, not the model's general knowledge.",
    "An evaluator skill re-checks the draft against the same legal criteria before a person sees it. A lawyer still approves every recommendation before it is final.",
  ],
  flow: [
    { title: "Incoming DPA", sub: "vendor draft, PDF or DOCX" },
    { title: "Intake skill", sub: "identify parties, roles, annexes" },
    {
      title: "Retrieve",
      sub: "ground the review in authoritative sources",
      branch: ["GDPR Art 28(3)", "GDPR Art 32", "GDPR Ch. V", "Internal playbook"],
    },
    { title: "DPA review skill", sub: "clause-by-clause against the checklist", accent: true },
    { title: "Self-review skill", sub: "evaluator-optimiser loop, same criteria" },
    { title: "Lawyer approval", sub: "reviewer accepts, edits or rejects each point", gate: true },
    { title: "Redline + recommendation", sub: "sent to the business" },
  ],
  governance: [
    {
      title: "Retrieval grounding",
      body: "The model may not cite an article or a playbook rule that was not retrieved. This is what keeps the review anchored to the law as written rather than to a plausible-sounding summary.",
    },
    {
      title: "Reusable skills",
      body: "The checklist, the red lines and the drafting standard live as version-controlled instructions. A change to the playbook is a change to one file, reviewable in a diff, applied consistently from then on.",
    },
    {
      title: "Evaluator loop",
      body: "A second pass critiques the first against the same criteria before any output reaches a person, so the obvious misses are caught by the workflow, not by the reviewer's attention on a busy afternoon.",
    },
    {
      title: "Approval gate",
      body: "No recommendation is final until the responsible lawyer has approved it. The workflow drafts; professional responsibility stays with the person.",
    },
    {
      title: "Audit trail",
      body: "Each output links back to the sources retrieved, the playbook rules applied, the steps run, and the human decision that signed it off. The review is reconstructable months later.",
    },
  ],
  sample: {
    inputLabel: "Sample agreement",
    inputName: "Acme Analytics Inc. — Data Processing Addendum v3 (fictional)",
    steps: [
      "Intake: controller = client; processor = Acme Analytics Inc.; 2 sub-processors listed in Annex 3",
      "Retrieved: GDPR Art 28(3)(a)–(h), Art 32(1), Art 44–46; internal DPA playbook v4",
      "DPA review skill: 10 mandatory checks run against the agreement text",
      "Self-review skill: re-ran all 10; upgraded one flag to a fail on closer reading of Annex 3",
    ],
    checks: [
      {
        ref: "Art 28(3)(a)",
        requirement: "Process only on documented instructions",
        status: "pass",
        finding: "Clause 3.1 binds the processor to the controller's written instructions and the Annex 1 processing description.",
        cite: "DPA cl. 3.1; GDPR Art 28(3)(a)",
      },
      {
        ref: "Art 28(3)(b)",
        requirement: "Confidentiality commitments for authorised persons",
        status: "pass",
        finding: "Clause 4.2 requires personnel to be under a duty of confidence.",
        cite: "DPA cl. 4.2; GDPR Art 28(3)(b)",
      },
      {
        ref: "Art 28(3)(d)",
        requirement: "Sub-processor prior authorisation and flow-down of terms",
        status: "fail",
        finding: "Clause 6 allows new sub-processors on 14 days' notice but does not require the same data-protection obligations to be imposed on them by contract. No flow-down term.",
        cite: "DPA cl. 6; GDPR Art 28(3)(d), Art 28(4)",
      },
      {
        ref: "Art 32(1)",
        requirement: "Security measures appropriate to the risk, specified",
        status: "flag",
        finding: "Annex 2 lists measures but omits encryption of data at rest and a testing-and-evaluation process. Below the playbook floor.",
        cite: "DPA Annex 2; GDPR Art 32(1)(a)–(d)",
      },
      {
        ref: "Art 28(3)(h)",
        requirement: "Audit and information rights for the controller",
        status: "flag",
        finding: "Clause 9 grants audit once per year with 60 days' notice and caps it at a third-party report. Playbook requires a right to audit on a breach without the cap.",
        cite: "DPA cl. 9; GDPR Art 28(3)(h)",
      },
      {
        ref: "Ch. V (Art 44–46)",
        requirement: "Lawful basis for transfers outside the EEA",
        status: "fail",
        finding: "Annex 3 places one sub-processor in the US with no transfer mechanism named. No SCCs incorporated, no transfer impact assessment referenced.",
        cite: "DPA Annex 3; GDPR Art 44, Art 46(2)(c)",
      },
      {
        ref: "Art 28(3)(g)",
        requirement: "Delete or return data at end of provision",
        status: "pass",
        finding: "Clause 11 provides for return then deletion within 90 days, with certification on request.",
        cite: "DPA cl. 11; GDPR Art 28(3)(g)",
      },
    ],
    verdict:
      "Not ready to sign. Two failures (sub-processor flow-down, undocumented US transfer) and two flags (security floor, audit rights). Draft redlines generated for all four; routed to the responsible lawyer for approval before sending to the vendor.",
  },
  method: [
    "These figures are demonstrative, not measured. They describe this build on one fixed sample agreement; there is no deployment data behind them and no empirical validation.",
    "The ~90 minute baseline is a typical hands-on review time for a mid-length vendor DPA against a full Article 28 checklist, drafting the redline included.",
    "The ~20 minute after figure is the model pass (about a minute) plus a reviewer working down 10 pre-argued findings, each with the clause reference and the retrieved article beside it, accepting or editing the draft redline.",
    "On those figures the throughput on a queue would rise several times over, with the same checklist applied identically to each agreement. That is the claim the build is meant to illustrate, not one it proves.",
  ],
  weak: [
    "Novel or heavily negotiated drafting. Bespoke clauses that trade one protection for another need a lawyer's read; the skill flags them rather than scoring them.",
    "The checklist is only as good as the playbook. A missing rule is a missing check. The playbook is the artefact to get right, and it is versioned for that reason.",
    "It reviews what is in the agreement. Side letters, an MSA that overrides the DPA, or an out-of-date sub-processor list defeat it unless those are supplied too.",
  ],
  extends:
    "The same architecture (intake, retrieval grounding, a review skill, an evaluator loop, an approval gate, an audit trail) runs a DPIA against Article 35, a transfer impact assessment against the Schrems II criteria, or a controller-to-controller agreement, by swapping the skill and the retrieved sources.",
};

/* ========================================================================== */
/* Case 03 — EU AI Act readiness                                               */
/* ========================================================================== */

export const AI_GOVERNANCE: WorkedExample = {
  slug: "ai-governance",
  accent: "indigo",
  area: "AI Governance",
  title: "EU AI Act readiness for an enterprise AI use case",
  metric: {
    before: "~2 days / system",
    after: "~3 hours",
    headline:
      "In this build, an assessment that would take about two days is produced in about three hours.",
  },
  process:
    "When a team wants to deploy or build an AI system, governance has to place it under the EU AI Act: is it prohibited, high-risk, limited-risk or minimal-risk, and which obligations follow from that tier. The output is a conformity register: every applicable obligation, its current state, the gap, and a named owner, ready for the AI governance committee to sign off or block.",
  problem: [
    "The classification question is legal, not technical: it turns on the Annex III use cases, the Article 5 prohibitions and the Article 6 carve-outs, read against what the system actually does.",
    "Once classified, the obligations are spread across Articles 9 to 15, 17, 26 and 72, each needing to be turned into something a product team can act on.",
    "Done by hand it is a two-day research task per system, and by the time it is written the system has often already shipped.",
  ],
  change: [
    "An intake skill turns a short system description into the facts the classification needs: purpose, users, data, autonomy, domain.",
    "A retrieval step grounds the assessment in the Act itself: the Article 5 list, Annex III, and the obligation articles for the tier in question, plus the organisation's AI policy.",
    "A mapping skill produces the conformity register directly: one row per obligation, a first-pass state and gap, and a suggested owner. An evaluator skill checks the classification and the mapping before the committee sees it; the committee decides.",
  ],
  flow: [
    { title: "New AI system", sub: "intake form: purpose, users, data, autonomy" },
    { title: "Intake skill", sub: "extract classification-relevant facts" },
    {
      title: "Retrieve",
      sub: "ground in the Act and internal policy",
      branch: ["AI Act Art 5", "Annex III", "Art 9–15, 26", "Internal AI policy"],
    },
    { title: "Risk classification skill", sub: "prohibited / high / limited / minimal", accent: true },
    { title: "Obligation mapping skill", sub: "obligations for the tier → register rows" },
    { title: "Self-review skill", sub: "re-check classification and mapping" },
    { title: "Governance committee", sub: "approve, require changes, or block", gate: true },
    { title: "Conformity register", sub: "obligation, state, gap, owner" },
  ],
  governance: [
    {
      title: "Retrieval grounding",
      body: "Classification cites the Article 5 point or the Annex III heading it turns on. No tier is asserted without the provision behind it.",
    },
    {
      title: "Reusable skills",
      body: "Classification logic and the obligation set per tier are encoded once and version-controlled, so two systems assessed a month apart are assessed the same way.",
    },
    {
      title: "Evaluator loop",
      body: "A second pass re-runs the classification and checks each obligation row against the retrieved article before the register is issued.",
    },
    {
      title: "Committee gate",
      body: "The register is a draft for the AI governance committee. Deployment is the committee's decision to make on the record, not the workflow's.",
    },
    {
      title: "Lifecycle trail",
      body: "The register, its sources and the committee's decision are logged, so the position can be shown to an auditor or revisited when the system changes.",
    },
  ],
  sample: {
    inputLabel: "Sample system",
    inputName: "Internal CV-screening assistant for recruitment (fictional)",
    steps: [
      "Intake: ranks and shortlists job applicants; used by recruiters; trained on 4 years of past hiring data; human recruiter makes the final call",
      "Retrieved: AI Act Art 5, Annex III(4)(a), Art 6, Art 9–15, Art 26; internal AI policy v2",
      "Risk classification skill: Annex III point 4(a), employment — recruitment and selection → high-risk",
      "Obligation mapping skill: high-risk obligation set generated; 6 rows below shown",
      "Self-review skill: confirmed tier; flagged Art 10 data-governance gap as the top risk",
    ],
    checks: [
      {
        ref: "Art 6 / Annex III(4)(a)",
        requirement: "Risk classification",
        status: "flag",
        finding: "AI used for recruitment and selection of natural persons falls under Annex III point 4(a). Classified high-risk. The Article 6(3) 'no significant risk' derogation does not apply: the system profiles and ranks people.",
        cite: "AI Act Annex III(4)(a); Art 6(2)–(3)",
      },
      {
        ref: "Art 9",
        requirement: "Risk management system, run across the lifecycle",
        status: "fail",
        finding: "No documented risk management system for the model. Ad hoc testing only, not a continuous iterative process.",
        cite: "AI Act Art 9(1)–(2); internal AI policy §4",
      },
      {
        ref: "Art 10",
        requirement: "Data and data governance; examine for bias",
        status: "fail",
        finding: "Training data is 4 years of past hiring decisions with no documented examination for bias against protected groups and no mitigation. Highest-priority gap.",
        cite: "AI Act Art 10(2)(f)–(g)",
      },
      {
        ref: "Art 13",
        requirement: "Transparency and instructions for deployers",
        status: "flag",
        finding: "Recruiters get a short internal note but no instructions covering the system's limitations, accuracy levels or the conditions for reliable use.",
        cite: "AI Act Art 13(1)–(3)",
      },
      {
        ref: "Art 14",
        requirement: "Human oversight, effective in practice",
        status: "flag",
        finding: "A recruiter makes the final decision, but there is no measure against automation bias and no guidance on when to override the ranking. Oversight is nominal.",
        cite: "AI Act Art 14(1), 14(4)(b),(d)",
      },
      {
        ref: "Art 26",
        requirement: "Deployer obligations, incl. informing affected workers",
        status: "fail",
        finding: "Candidates and the works council have not been informed that a high-risk AI system is used in the process.",
        cite: "AI Act Art 26(7); Directive 2002/14/EC",
      },
    ],
    verdict:
      "High-risk, not deployable in current state. Two obligations with material failures (Art 10 data governance, Art 26 information duties) and Art 9 absent. Register issued to the AI governance committee with owners assigned; committee to decide on a remediation deadline or a hold.",
  },
  method: [
    "These figures are demonstrative, not measured. They describe this build on one fixed sample system; there is no deployment data behind them and no empirical validation.",
    "The ~2 day baseline is a realistic effort for a first AI Act classification and obligation mapping of one non-trivial system, done from the Act and internal policy.",
    "The ~3 hour after figure is the model pass plus a governance analyst checking the classification against the retrieved provisions and reviewing each obligation row before it goes to committee.",
    "On those figures the assessment would reach a defensible draft in an afternoon rather than over two days, so it happens before deployment instead of after. That is what the build is meant to show, not something it has proven.",
  ],
  weak: [
    "Borderline classification. Systems near the Annex III edges or relying on an Article 6(3) derogation need a lawyer's judgement; the workflow surfaces the question, it does not close it.",
    "The Act is new and guidance is still landing. The retrieved sources and the skill need maintaining as the Commission's guidance and harmonised standards are published.",
    "A register is not conformity. It scopes the work and assigns it; closing each gap, and any conformity assessment, is the real programme.",
  ],
  extends:
    "The same workflow produces a fundamental-rights impact assessment under Article 27, a GPAI obligation check, or an ISO/IEC 42001 gap analysis, by changing the retrieved framework and the mapping skill.",
};

export const WORKED_EXAMPLES = { "dpa-review": DPA_REVIEW, "ai-governance": AI_GOVERNANCE };
