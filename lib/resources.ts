/**
 * Curated primary sources behind each case study. Every link points to the
 * issuing authority's own page (EUR-Lex, EDPB, the European Commission, ISO,
 * NIST). Identifiers are given so an item stays citable if a URL moves.
 *
 * `free: false` marks ISO standards, which are published by ISO and require
 * purchase. EU regulations and regulator guidance are free to access.
 */

export type ResourceKind =
  | "Regulation"
  | "Standard"
  | "Regulator guidance"
  | "Framework";

export type Resource = {
  id: string;
  title: string;
  publisher: string;
  kind: ResourceKind;
  url: string;
  note: string;
  free: boolean;
};

export type ResourceGroup = {
  heading: string;
  intro?: string;
  items: Resource[];
};

/* ---- Case 01: ISO 27001 gap analysis ---------------------------------- */
export const ISO_RESOURCES: ResourceGroup[] = [
  {
    heading: "The standard and its guidance",
    items: [
      {
        id: "ISO/IEC 27001:2022",
        title: "Information security, cybersecurity and privacy protection — ISMS — Requirements",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/27001",
        note: "The requirements the assessment is measured against, including the Annex A control set.",
        free: false,
      },
      {
        id: "ISO/IEC 27002:2022",
        title: "Information security controls",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/75652",
        note: "Implementation guidance for all 93 Annex A controls. The basis for the paraphrased control objectives used in the tool.",
        free: false,
      },
      {
        id: "ISO/IEC 27005:2022",
        title: "Guidance on managing information security risks",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/80585",
        note: "The risk-management method behind control selection and the Statement of Applicability.",
        free: false,
      },
    ],
  },
  {
    heading: "Complementary frameworks",
    items: [
      {
        id: "NIST CSF 2.0",
        title: "Cybersecurity Framework 2.0",
        publisher: "NIST",
        kind: "Framework",
        url: "https://www.nist.gov/cyberframework",
        note: "Govern, Identify, Protect, Detect, Respond, Recover. The target for the framework crosswalk noted as future work.",
        free: true,
      },
      {
        id: "NIST SP 800-37 Rev. 2",
        title: "Risk Management Framework for Information Systems and Organizations",
        publisher: "NIST",
        kind: "Framework",
        url: "https://csrc.nist.gov/pubs/sp/800/37/r2/final",
        note: "A six-step risk-management process that complements the risk-based approach in ISO/IEC 27001.",
        free: true,
      },
      {
        id: "ISO/IEC 27701",
        title: "Privacy Information Management System — extension to 27001 and 27002",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/71670",
        note: "Adds controller and processor privacy controls, mapping the ISMS to GDPR obligations.",
        free: false,
      },
    ],
  },
];

/* ---- Case 02: DPA review --------------------------------------------- */
export const DPA_RESOURCES: ResourceGroup[] = [
  {
    heading: "Primary law",
    items: [
      {
        id: "Regulation (EU) 2016/679",
        title: "General Data Protection Regulation (GDPR)",
        publisher: "EUR-Lex · European Union",
        kind: "Regulation",
        url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
        note: "Article 28(3) mandatory processor clauses, Article 32 security of processing, Chapter V transfers.",
        free: true,
      },
      {
        id: "Implementing Decision (EU) 2021/914",
        title: "Standard Contractual Clauses for the transfer of personal data to third countries",
        publisher: "European Commission",
        kind: "Regulation",
        url: "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en",
        note: "The current controller-to-processor SCCs, referenced whenever a transfer needs a safeguard under Article 46.",
        free: true,
      },
    ],
  },
  {
    heading: "Regulator guidance",
    intro:
      "European Data Protection Board guidance is the authoritative reading of the GDPR and is treated as a mandatory reference.",
    items: [
      {
        id: "EDPB Guidelines 07/2020",
        title: "Concepts of controller and processor in the GDPR",
        publisher: "European Data Protection Board",
        kind: "Regulator guidance",
        url: "https://www.edpb.europa.eu/documents/guideline/guidelines-072020-on-the-concepts-of-controller-and-processor-in-the-gdpr_en",
        note: "How the controller/processor split works and what the Article 28 contract must contain.",
        free: true,
      },
      {
        id: "EDPB Recommendations 01/2020",
        title: "Measures that supplement transfer tools to ensure compliance with the EU level of protection",
        publisher: "European Data Protection Board",
        kind: "Regulator guidance",
        url: "https://www.edpb.europa.eu/documents/recommendation/recommendations-012020-on-measures-that-supplement-transfer-tools-to_en",
        note: "The post-Schrems II transfer impact assessment method used for Chapter V checks.",
        free: true,
      },
      {
        id: "WP248 rev.01",
        title: "Guidelines on Data Protection Impact Assessment (DPIA)",
        publisher: "Article 29 Working Party, endorsed by the EDPB",
        kind: "Regulator guidance",
        url: "https://ec.europa.eu/newsroom/article29/items/611236",
        note: "When a DPIA is required and how to run one. Used for the DPIA extension of the same workflow.",
        free: true,
      },
      {
        id: "ICO",
        title: "Accountability and governance, including controller–processor contracts",
        publisher: "Information Commissioner's Office (UK)",
        kind: "Regulator guidance",
        url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/",
        note: "The UK regulator's guidance on the Article 28 contract requirements and processor due diligence.",
        free: true,
      },
      {
        id: "CNIL",
        title: "GDPR guidance and model contractual clauses",
        publisher: "Commission nationale de l'informatique et des libertés (France)",
        kind: "Regulator guidance",
        url: "https://www.cnil.fr/en",
        note: "The French regulator's GDPR guidance and processor obligations.",
        free: true,
      },
    ],
  },
  {
    heading: "Related standards",
    items: [
      {
        id: "ISO/IEC 27701",
        title: "Privacy Information Management System",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/71670",
        note: "Turns Article 28 and Article 32 obligations into auditable controls.",
        free: false,
      },
      {
        id: "ISO/IEC 27001:2022",
        title: "Information Security Management System — Requirements",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/27001",
        note: "The security baseline a processor is expected to meet under Article 32.",
        free: false,
      },
    ],
  },
];

/* ---- Case 03: EU AI Act readiness ----------------------------------- */
export const AI_RESOURCES: ResourceGroup[] = [
  {
    heading: "Primary law",
    items: [
      {
        id: "Regulation (EU) 2024/1689",
        title: "Artificial Intelligence Act",
        publisher: "EUR-Lex · European Union",
        kind: "Regulation",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        note: "Article 5 prohibitions, Article 6 and Annex III high-risk classification, Articles 9–15 provider obligations, Article 26 deployer obligations.",
        free: true,
      },
    ],
  },
  {
    heading: "Regulator guidance",
    items: [
      {
        id: "AI Act regulatory framework",
        title: "Regulatory framework for AI — policy, timeline and guidance",
        publisher: "European Commission · Digital Strategy",
        kind: "Regulator guidance",
        url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        note: "The Commission's implementation hub: application dates by risk tier and published guidance.",
        free: true,
      },
      {
        id: "European AI Office",
        title: "The AI Office",
        publisher: "European Commission",
        kind: "Regulator guidance",
        url: "https://digital-strategy.ec.europa.eu/en/policies/ai-office",
        note: "The central EU body for AI Act implementation, general-purpose AI oversight and guidance.",
        free: true,
      },
      {
        id: "EDPB",
        title: "Opinions and guidelines, including Opinion 28/2024 on AI models",
        publisher: "European Data Protection Board",
        kind: "Regulator guidance",
        url: "https://www.edpb.europa.eu",
        note: "The AI Act / GDPR interplay: lawful basis for training data, and Article 22 automated decisions.",
        free: true,
      },
    ],
  },
  {
    heading: "Management-system standards",
    items: [
      {
        id: "ISO/IEC 42001:2023",
        title: "Artificial intelligence — Management system",
        publisher: "ISO",
        kind: "Standard",
        url: "https://www.iso.org/standard/42001",
        note: "The organisational layer around AI Act conformity: governance, roles, risk process, documentation. Standard no. 81230.",
        free: false,
      },
      {
        id: "NIST AI RMF 1.0",
        title: "Artificial Intelligence Risk Management Framework",
        publisher: "NIST",
        kind: "Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
        note: "Govern, Map, Measure, Manage. Aligns with the Act's risk-management intent.",
        free: true,
      },
    ],
  },
];

/* ---- Cross-cutting -------------------------------------------------- */
export const CROSS_CUTTING: ResourceGroup[] = [
  {
    heading: "Where to track changes",
    items: [
      {
        id: "EUR-Lex",
        title: "Consolidated EU legislation and case law",
        publisher: "European Union",
        kind: "Regulation",
        url: "https://eur-lex.europa.eu",
        note: "The authoritative text of every EU regulation cited here.",
        free: true,
      },
      {
        id: "EDPB",
        title: "Guidelines, recommendations, opinions and decisions",
        publisher: "European Data Protection Board",
        kind: "Regulator guidance",
        url: "https://www.edpb.europa.eu",
        note: "The source for GDPR interpretation across the EU.",
        free: true,
      },
      {
        id: "ISO/IEC JTC 1/SC 42",
        title: "Artificial intelligence standards committee",
        publisher: "ISO/IEC",
        kind: "Standard",
        url: "https://www.iso.org/committee/6794475.html",
        note: "Develops ISO/IEC 42001 and the wider AI standards family.",
        free: true,
      },
    ],
  },
];

export const CASE_RESOURCES: Record<string, ResourceGroup[]> = {
  "iso-27001": ISO_RESOURCES,
  "dpa-review": DPA_RESOURCES,
  "ai-governance": AI_RESOURCES,
};
