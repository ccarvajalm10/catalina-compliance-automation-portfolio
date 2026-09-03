/**
 * Portfolio content. EDIT THIS FILE. Nothing else in the app needs changing.
 */
export const siteConfig = {
  author: {
    name: "Catalina Carvajal M.",
    title: "AI Governance, Privacy & GRC Specialist",
    location: "Dublin, Ireland",
    email: "catalinacarvajalm3@gmail.com",
    // file lives in /public. Set to "" to hide the portrait.
    photo: "/catalina.jpg",
  },

  /** The portfolio as a whole. Shown in the hero and metadata. */
  portfolio: {
    kicker: "Portfolio",
    tagline: "AI automation for digital compliance. Faster processes without giving up the audit trail.",
    lede: "These case studies are part of my thesis research on bringing AI into the everyday compliance workflows that legal, compliance and consultancy teams run. It is an approach I am planning to apply and keep developing in my own work.",
    // The three practice areas the portfolio covers.
    areas: [
      "Governance, Risk & Control",
      "Privacy & Data Protection",
      "AI Governance",
    ],
  },

  /** The thesis this portfolio operationalises. */
  thesis: {
    title:
      "From Regulation to Workflow: A Framework for Responsible AI Implementation in Legal Operations and Compliance Functions",
    degree: "MSc in Law, Data and AI (EMILDAI)",
    argument:
      "Responsible AI in legal and compliance work is achieved not through isolated technical features but by building governance mechanisms into the workflow itself: retrieval grounding, an encoded playbook, an evaluator loop, a human approval gate, and an audit trail.",
    note:
      "Each case study here is an illustrative implementation of that framework, assessed against the external legal requirements it targets rather than against internally defined success criteria.",
  },

  /** Shown in the About section. */
  about: {
    bio: "Legal and compliance specialist focused on AI governance, data protection and information-security control frameworks. Completing an MSc in Law, Data and AI (EMILDAI) with a specialisation in Cybersecurity at Universidad de León and AI Ethics at Università di Pisa. CIPM and CIPP/E certified.",
    background:
      "My background is multidisciplinary across technology, data and law. Before moving into Law, Data and AI, I worked in a compliance team at a law firm in Colombia, where much of the work was manual review of organisations and contracts against control frameworks and statutory requirements. This portfolio grew out of my Master's thesis, From Regulation to Workflow, and puts its framework into practice on three real processes.",
    expertise: [
      "ISO/IEC 27001 and 27002",
      "GDPR, DPAs and DPIAs",
      "EU AI Act readiness",
      "Risk management and internal controls",
      "AI governance and assurance",
    ],
  },

  links: {
    linkedin: "https://www.linkedin.com/in/catalinacarvajalm/",
    github: "https://github.com/ccarvajalm10",
    // update once you create and push the repo
    repo: "https://github.com/ccarvajalm10/compliance-automation-portfolio",
  },

  /**
   * The three case studies. `slug` is the URL under /case-study.
   * `metric` is the headline "pain the AI solves, with a number".
   */
  caseStudies: [
    {
      slug: "iso-27001",
      number: "01",
      area: "Governance, Risk & Control",
      accent: "forest",
      title: "An ISO 27001 gap analysis, rebuilt as an AI pipeline",
      process:
        "The first ISO/IEC 27001:2022 readiness gap analysis: a verdict on all 93 Annex A controls with the evidence for each.",
      metric: {
        before: "~4 analyst-days",
        after: "~1 day",
        headline: "About 75% less analyst time on the first pass",
      },
      liveTool: true,
      summary:
        "A pipeline reads the whole ISMS document set and drafts a cited verdict for every control, so a reviewer checks 93 pre-argued findings instead of writing them from a blank page.",
    },
    {
      slug: "dpa-review",
      number: "02",
      area: "Privacy & Data Protection",
      accent: "clay",
      title: "Data Processing Agreement review, governed end to end",
      process:
        "Pre-signature review of a DPA against GDPR Article 28(3), the Article 32 security obligations, and the Chapter V transfer rules.",
      metric: {
        before: "~90 min / agreement",
        after: "~20 min review",
        headline: "Around 4x throughput on the DPA queue",
      },
      liveTool: false,
      summary:
        "A retrieval-grounded review skill checks the agreement clause by clause against the GDPR articles and the organisation's playbook, an evaluator skill critiques that draft, and a lawyer approves before anything is final.",
    },
    {
      slug: "ai-governance",
      number: "03",
      area: "AI Governance",
      accent: "indigo",
      title: "EU AI Act readiness for an enterprise AI use case",
      process:
        "Intake of a new AI system: risk classification under the EU AI Act and a mapped obligation set (Articles 9, 10, 13, 14, 15) with an owner for each.",
      metric: {
        before: "~2 days / system",
        after: "~3 hours",
        headline: "About one working day back per AI system assessed",
      },
      liveTool: false,
      summary:
        "The workflow classifies the system's risk tier, pulls the obligations that attach to that tier, and produces a conformity register with a gap and an owner against each one, ready for the governance committee.",
    },
  ],

  /**
   * Consultation space. This is a direct email, not a booking system.
   */
  contact: {
    heading: "Work with me",
    title: "Email me about any of these three",
    blurb:
      "I help legal and compliance teams stand up governed AI workflows for the processes on this site: ISO/IEC 27001 readiness, GDPR Data Processing Agreement and DPIA review, and EU AI Act classification and obligation mapping.",
    offers: [
      "A readiness or gap assessment against ISO/IEC 27001, the GDPR, or the EU AI Act",
      "Designing a review workflow with the controls kept inside it (retrieval grounding, encoded playbook, evaluator check, human approval gate)",
      "A second opinion on an AI system's risk classification and obligations",
    ],
    emailSubject: "Enquiry from the portfolio",
    note: "Goes straight to my inbox. I usually reply within two working days.",
  },

  /** Downloadable working templates, served from /public/templates. */
  templates: [
    {
      file: "/templates/ISO27001-2022-Self-Assessment.xlsx",
      name: "ISO/IEC 27001:2022 clause self-assessment",
      note: "A tab per management-system clause (4 Context, 5 Leadership, 6 Planning, 7 Support, 8 Operation, 9 Performance Evaluation, 10 Improvement), with maturity scoring and Summary and Action Plan tabs. A working template I have used to run readiness assessments.",
    },
    {
      file: "/templates/ISO27001-2022-Gap-Analysis-and-SoA.xlsx",
      name: "Gap analysis and Statement of Applicability",
      note: "Two registers: the Section 4 to 10 mandatory requirements, and all 93 Annex A controls with an applies yes/no column, a six-level implementation maturity scale, and a justification column. Doubles as the Statement of Applicability.",
    },
  ],
} as const;

export type CaseStudy = (typeof siteConfig.caseStudies)[number];
