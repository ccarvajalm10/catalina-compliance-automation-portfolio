/**
 * Builds data/fixtures/analysis.json — the pre-computed assessment shown in DEMO MODE.
 *
 * This is a hand-authored REFERENCE assessment of the sample company (Northwind Cloud)
 * against ISO/IEC 27001:2022 Annex A, written by the project author. It is what the
 * /tool page renders when no ANTHROPIC_API_KEY is configured. When a key IS configured,
 * the page runs the real pipeline (lib/analyzer.ts) instead.
 *
 * Run:  node scripts/build-fixture.mjs
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const COMPANY_DIR = join(ROOT, "data", "company", "northwind");

// ── load docs for the quote integrity check ────────────────────────────────────
function loadDocs() {
  const out = {};
  for (const [sub] of [["policies"], ["evidence"]]) {
    const dir = join(COMPANY_DIR, sub);
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const content = readFileSync(join(dir, file), "utf8");
      const h = content.match(/^#\s+(.+)$/m);
      const name = h ? h[1].trim() : file;
      out[name] = content;
    }
  }
  return out;
}
const DOCS = loadDocs();
const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const NORM_DOCS = Object.fromEntries(
  Object.entries(DOCS).map(([k, v]) => [k, norm(v)]),
);

// ── the reference findings ────────────────────────────────────────────────────
// f(id, verdict, confidence, rationale, evidence[[source,quote]], remediation)
const F = (controlId, verdict, confidence, rationale, evidence = [], remediation = null) => ({
  controlId,
  verdict,
  confidence,
  rationale,
  evidence: evidence.map(([source, quote]) => ({ source, quote })),
  remediation,
});

const ISP = "Information Security Policy";
const AC = "Access Control Policy";
const AM = "Asset Management Policy";
const HR = "HR Security Policy";
const SUP = "Supplier Security Policy";
const IRP = "Incident Response Plan";
const DEV = "Secure Development Policy";
const CRY = "Cryptography Policy";
const BC = "Business Continuity & Backup Policy";
const AUP = "Acceptable Use & Remote Working Policy";
const EV = "Evidence Register — Northwind Cloud Ltd";

const findings = [
  // A.5 Organizational
  F("A.5.1", "Met", 0.95, "A full policy set is defined, board-approved, published and acknowledged, with an annual review cycle.", [[ISP, "All are published on the company wiki and staff acknowledge them on hire."]]),
  F("A.5.2", "Met", 0.82, "Security governance roles are defined and asset/resource owners are recorded.", [[ISP, "meets quarterly, reviews KPIs, risks, incidents and audit results, and records minutes."], [AM, "Each asset has a named owner recorded in the inventory."]]),
  F("A.5.3", "Partial", 0.62, "Segregation is enforced for code changes and privileged access but there is no documented duties matrix covering other conflicting roles.", [[AC, "changes require pull request and one review."]], "Document a segregation-of-duties matrix covering conflicting roles beyond engineering."),
  F("A.5.4", "Met", 0.8, "Management drives security through the Steering Committee and mandatory training tracked to completion.", [[ISP, "The Information Security Steering Committee (CISO, CTO, Head of People, Head of Legal)"]]),
  F("A.5.5", "Partial", 0.58, "Regulator contact exists for breach notification, but there is no maintained list of relevant authorities and triggers.", [[IRP, "Customer and regulatory notification decisions are made by the Comms Lead with Legal."]], "Maintain a documented list of relevant authorities (regulator, law enforcement, CERT) with contacts and triggers."),
  F("A.5.6", "Gap", 0.8, "No evidence of membership in security forums, ISACs or special interest groups.", [], "Join relevant security groups and record participation."),
  F("A.5.7", "Gap", 0.75, "SIEM rules exist but there is no process to collect and analyse threat intelligence.", [[EV, "coverage not mapped to a threat model"]], "Establish a lightweight threat intelligence process feeding detection rules and risk reviews."),
  F("A.5.8", "Gap", 0.7, "Threat modelling is informal for large features; security is not a required part of project management.", [[DEV, "threat modelling is done informally for large features"]], "Add a security checklist/gate to the project and feature delivery process."),
  F("A.5.9", "Met", 0.9, "Endpoints, cloud and SaaS are inventoried automatically with named owners.", [[AM, "Cloud assets are inventoried via AWS Config and tagged with `owner` and `data-class`."]]),
  F("A.5.10", "Met", 0.88, "Acceptable use and handling rules are documented and acknowledged.", [[AUP, "Customer Data may only be stored in approved systems, never on local disks or personal cloud storage."]]),
  F("A.5.11", "Met", 0.85, "Assets are recovered and recorded on offboarding.", [[AM, "IT recovers company laptops and hardware keys and records their return in the offboarding checklist."]]),
  F("A.5.12", "Met", 0.85, "A four-tier classification scheme with handling rules is defined.", [[AM, "Information is classified as **Public**, **Internal**, **Confidential**, or **Customer Data**."]]),
  F("A.5.13", "Partial", 0.7, "A labelling scheme is drafted but not yet rolled out.", [[AM, "labelling scheme for classified documents and emails has been drafted"]], "Roll out the labelling scheme and add it to onboarding and handling guidance."),
  F("A.5.14", "Partial", 0.6, "Transport encryption is strong, but there are no transfer rules, procedures or agreements for other channels.", [[CRY, "All external connections use TLS 1.2 or higher."]], "Define an information transfer standard covering channels, approvals and agreements."),
  F("A.5.15", "Met", 0.92, "A role-based access model with owner approval is defined and applied.", [[AC, "Requests are raised in the ticket system and approved by the resource owner."]]),
  F("A.5.16", "Met", 0.9, "Identity lifecycle is automated from the HR system with unique named accounts.", [[AC, "Each person has one unique named account. Shared accounts are prohibited."]]),
  F("A.5.17", "Met", 0.85, "Authentication information is controlled: screened passwords, SSO, and hardware keys for production.", [[AC, "Password policy: minimum 14 characters, screened against breached-password lists, no forced rotation."]]),
  F("A.5.18", "Met", 0.88, "Access rights are provisioned by role and reviewed quarterly, with escalation for overdue reviews.", [[AC, "User access to production systems and customer data is reviewed quarterly by resource owners."]]),
  F("A.5.19", "Partial", 0.65, "A supplier assessment process exists, but the governing policy is an unapproved draft.", [[SUP, "the requesting team completes a supplier risk questionnaire and Legal reviews the supplier's security"]], "Approve and publish the Supplier Security Policy and complete the supplier register."),
  F("A.5.20", "Partial", 0.63, "Security clauses are in the MSA template, but coverage across all existing data-handling suppliers is unconfirmed.", [[SUP, "Security requirements are included in the master services agreement template."]], "Confirm security clauses are in place for every supplier handling Confidential or Customer Data."),
  F("A.5.21", "Gap", 0.82, "ICT supply-chain risk is explicitly not assessed.", [[SUP, "The ICT supply-chain risk (sub-processors of our sub-processors) is not formally assessed."]], "Assess ICT supply-chain risk for critical products and services and record it."),
  F("A.5.22", "Gap", 0.8, "There is no process to monitor supplier service levels or manage supplier-side changes.", [[SUP, "There is no defined process for monitoring supplier service levels or handling supplier-side changes."]], "Define supplier performance and change monitoring with a review cadence."),
  F("A.5.23", "Partial", 0.66, "Cloud acquisition is gated by CISO approval, but there is no documented exit strategy or shared-responsibility mapping.", [[SUP, "Use of new cloud services that will store Customer Data must be approved by the CISO."]], "Document a cloud exit strategy and shared-responsibility allocation."),
  F("A.5.24", "Met", 0.9, "Incident roles, channels and runbooks are defined and the plan has been tested.", [[IRP, "Documented runbooks exist for: account compromise, data exposure, ransomware/malware,"]]),
  F("A.5.25", "Met", 0.82, "Events are triaged against a severity matrix and an incident decision is made by the Incident Commander.", [[IRP, "The Incident Commander decides whether an event is an incident."]]),
  F("A.5.26", "Met", 0.85, "Response follows documented runbooks with actions recorded in the incident ticket.", [[IRP, "Containment, eradication and recovery steps are recorded in the incident ticket."]]),
  F("A.5.27", "Met", 0.85, "Post-incident reviews are held for higher-severity incidents and themes reported to management.", [[IRP, "A post-incident review is held within 10 working days for all SEV-1 and SEV-2 incidents."]]),
  F("A.5.28", "Met", 0.8, "A forensic-readiness checklist and chain-of-custody record are used when evidence must be preserved.", [[IRP, "maintains a chain-of-custody record."]]),
  F("A.5.29", "Partial", 0.64, "A BCP covering key scenarios exists but has never been exercised.", [[BC, "A business continuity plan exists covering loss of the primary AWS region, loss of the office, and loss of key staff."]], "Exercise the BCP and confirm security controls hold during failover."),
  F("A.5.30", "Partial", 0.6, "RTO/RPO and multi-region capability are defined, but ICT continuity requirements are not mapped to tested recovery procedures.", [[BC, "ICT continuity requirements (A.5.30) are not mapped to specific recovery procedures."]], "Map ICT continuity requirements to tested recovery procedures."),
  F("A.5.31", "Met", 0.8, "A legal and regulatory requirements register is maintained.", [[EV, "Legal/regulatory requirements register (GDPR, DPA 2018, contractual)"]]),
  F("A.5.32", "Gap", 0.65, "Dependency scanning covers vulnerabilities but there is no IP/licensing compliance procedure.", [], "Add an IP and software-licensing compliance procedure, including open-source license scanning."),
  F("A.5.33", "Partial", 0.6, "A retention schedule exists, but protection of statutory records against loss and falsification is not documented.", [[EV, "Data retention schedule"]], "Define record-protection controls (integrity, retention, disposal) for key record types."),
  F("A.5.34", "Partial", 0.62, "DPAs and a GDPR register exist, but there is no consolidated PII protection standard or record of processing activities.", [[SUP, "Data processing agreements are signed with all suppliers that process personal data."]], "Document a PII protection standard and a record of processing activities."),
  F("A.5.35", "Partial", 0.58, "Independent technical testing (annual pen test) occurs, but no independent review of the ISMS itself has been done yet.", [[DEV, "An external penetration test is performed annually and findings are tracked to closure."]], "Complete the first internal ISMS audit and schedule an independent review."),
  F("A.5.36", "Partial", 0.6, "Policy review completion is tracked, but there is no systematic control-by-control compliance check.", [[AC, "Review completion is tracked by the CISO; incomplete reviews are escalated to the Steering Committee."]], "Introduce periodic compliance checks against each policy and feed results to management review."),
  F("A.5.37", "Partial", 0.6, "Incident runbooks and infrastructure-as-code exist, but there is no general set of documented operating procedures for routine administration.", [[IRP, "Documented runbooks exist for: account compromise, data exposure, ransomware/malware,"]], "Document standard operating procedures for recurring administration tasks."),

  // A.6 People
  F("A.6.1", "Met", 0.85, "Pre-employment screening covers identity, right to work, references and (where lawful) criminal record checks for privileged roles.", [[HR, "all candidates undergo identity verification, right-to-work checks,"]]),
  F("A.6.2", "Met", 0.85, "Employment contracts and contractor SOWs include information security obligations.", [[HR, "Employment contracts include an information security clause and reference the Acceptable"]]),
  F("A.6.3", "Met", 0.88, "Induction, annual awareness training, secure-coding training and quarterly phishing simulations are run and tracked.", [[HR, "All staff complete annual security awareness training (KnowBe4); completion is tracked"]]),
  F("A.6.4", "Partial", 0.66, "Disciplinary action is referenced in the ISP but there is no written disciplinary process for security violations.", [[HR, "There is no written disciplinary procedure specific to security."]], "Document a formal disciplinary process for security policy violations, linked to HR procedures."),
  F("A.6.5", "Met", 0.78, "Continuing obligations are reinforced at exit and access/asset removal is triggered by offboarding.", [[HR, "The employee is reminded in the exit meeting of continuing confidentiality"]]),
  F("A.6.6", "Met", 0.85, "All personnel and contractors sign confidentiality agreements, reviewed by Legal every two years.", [[HR, "All employees and contractors sign a confidentiality agreement before their start date."]]),
  F("A.6.7", "Met", 0.82, "Remote working is governed: managed encrypted devices only, SSO+MFA, VPN and hardware keys for production.", [[AUP, "Only MDM-managed, encrypted devices may access company systems."]]),
  F("A.6.8", "Met", 0.85, "A clear reporting channel for suspected events exists and reports are logged quickly.", [[IRP, "Staff report suspected incidents via the `#security-incidents` Slack channel or"]]),

  // A.7 Physical
  F("A.7.1", "Partial", 0.55, "Remote-first with one small office that has lockable storage; the data-centre perimeter is inherited from AWS but not documented as such.", [[AUP, "The London office has lockable storage."]], "Document office physical security arrangements and the reliance on AWS for data-centre perimeter."),
  F("A.7.2", "Gap", 0.6, "No documented office entry controls or visitor management.", [], "Document and implement office entry controls (badge access, visitor log)."),
  F("A.7.3", "Partial", 0.52, "Lockable storage is mentioned but there is no description of how offices and rooms holding equipment or records are secured.", [[AUP, "The London office has lockable storage."]], "Document how office areas holding equipment and records are secured."),
  F("A.7.4", "Gap", 0.6, "No physical security monitoring (alarm/CCTV or landlord equivalent) is described.", [], "Record physical monitoring arrangements for the office."),
  F("A.7.5", "Partial", 0.55, "Environmental protection for production is inherited from AWS and evidenced; the office is not assessed.", [[EV, "AWS SOC 2 Type II report (reviewed)"]], "Record environmental-threat protection reliance on AWS and assess the office."),
  F("A.7.6", "Not Applicable", 0.7, "There are no designated secure areas: all production is in AWS and staff work remotely.", [], null),
  F("A.7.7", "Met", 0.8, "Automatic screen lock and clear-desk rules for printed confidential material are defined.", [[AUP, "Screens lock automatically after 5 minutes."]]),
  F("A.7.8", "Not Applicable", 0.65, "No on-premises server or network equipment; production is hosted by AWS and end-user laptops are covered by endpoint controls.", [], null),
  F("A.7.9", "Met", 0.75, "Off-premises assets are protected via MDM enrolment, full-disk encryption and remote-working rules.", [[AUP, "Only MDM-managed, encrypted devices may access company systems."]]),
  F("A.7.10", "Partial", 0.62, "Endpoint encryption and USB blocking are in place, but there is no documented media handling, transport or disposal procedure.", [[AM, "Portable media (USB drives) are blocked by MDM policy."]], "Document storage-media handling and disposal across its lifecycle."),
  F("A.7.11", "Not Applicable", 0.62, "No owned data centre; utility resilience for production is an AWS responsibility and the office is not an information processing facility.", [], null),
  F("A.7.12", "Not Applicable", 0.62, "No on-premises infrastructure cabling in scope.", [], null),
  F("A.7.13", "Partial", 0.55, "Endpoint patching and health are evidenced via MDM, but there is no documented maintenance policy.", [[EV, "MDM compliance report (disk encryption, USB blocking, patch status)"]], "Document equipment maintenance expectations for endpoints."),
  F("A.7.14", "Gap", 0.7, "Laptops are recovered on offboarding but there is no documented secure wipe or disposal procedure.", [], "Define and evidence secure wipe/disposal for endpoints and media before re-use or disposal."),

  // A.8 Technological
  F("A.8.1", "Met", 0.85, "Endpoints are MDM-managed, encrypted and restricted to approved access paths.", [[AUP, "Only MDM-managed, encrypted devices may access company systems."]]),
  F("A.8.2", "Met", 0.9, "Privileged production access is just-in-time, time-bound and session-recorded, with monthly review.", [[AC, "Privileged/admin access to production is time-bound (max 8 hours) and requested"]]),
  F("A.8.3", "Met", 0.82, "Access to information is restricted by least-privilege roles with owner approval.", [[AC, "Requests are raised in the ticket system and approved by the resource owner."]]),
  F("A.8.4", "Met", 0.8, "Source code access is team-based with branch protection on main.", [[AC, "Access to the Git organisation is granted by team."]]),
  F("A.8.5", "Met", 0.9, "SSO with enforced MFA for all users and FIDO2 keys for production.", [[AC, "Multi-factor authentication is enforced for all users on all SSO logins."]]),
  F("A.8.6", "Partial", 0.55, "Multi-AZ resilience is described, but there is no documented capacity monitoring or forecasting process.", [[BC, "Production runs across three availability zones in eu-west-1."]], "Document capacity monitoring thresholds and a review cadence."),
  F("A.8.7", "Partial", 0.6, "Security software may not be disabled, implying endpoint protection, but there is no explicit anti-malware standard or coverage evidence.", [[AUP, "Prohibited: disabling security software, installing unapproved software with admin rights,"]], "Document anti-malware/EDR controls and include coverage in the MDM compliance report."),
  F("A.8.8", "Met", 0.72, "Dependency scanning, SAST, secret scanning and an annual pen-test tracker manage technical vulnerabilities, though the last pen test is overdue.", [[DEV, "dependency vulnerability scanning (Dependabot), static analysis"]]),
  F("A.8.9", "Partial", 0.58, "Configuration is tracked via AWS Config and MDM, but secure configuration baselines are not defined or monitored against.", [[AM, "Cloud assets are inventoried via AWS Config"]], "Define and monitor secure configuration baselines for endpoints, cloud and network."),
  F("A.8.10", "Partial", 0.55, "Leaver accounts are deleted after 30 days and a retention schedule exists, but there is no comprehensive deletion process across systems and backups.", [[AC, "accounts are disabled within 2 hours of the termination event and deleted after 30 days."]], "Document information deletion procedures including customer offboarding and backups."),
  F("A.8.11", "Gap", 0.68, "No data masking or pseudonymisation is described where data is displayed or exported.", [], "Assess where masking/pseudonymisation is required and implement it."),
  F("A.8.12", "Partial", 0.5, "Storage restrictions and USB blocking reduce leakage risk, but there is no DLP tooling for email or SaaS egress.", [[AUP, "Customer Data may only be stored in approved systems, never on local disks or personal cloud storage."]], "Evaluate DLP controls for email and SaaS data egress."),
  F("A.8.13", "Partial", 0.66, "Backups are configured (PITR, cross-region replication) but restoration has never been tested end-to-end.", [[EV, "Backup success only"]], "Perform and document periodic backup restoration tests."),
  F("A.8.14", "Met", 0.8, "Production runs across three AZs with a multi-AZ database and automatic failover.", [[BC, "The database is\nmulti-AZ with automatic failover."]]),
  F("A.8.15", "Partial", 0.6, "CloudTrail and application logs are retained for 400 days, but there is no documented log-review procedure.", [[EV, "no documented log-review procedure"]], "Document what is logged, how logs are protected, and a log-review procedure."),
  F("A.8.16", "Partial", 0.58, "A SIEM with ~15 alert rules exists, but detection coverage is not mapped to a threat model.", [[EV, "coverage not mapped to a threat model"]], "Map detection coverage to prioritised threats and review rule effectiveness."),
  F("A.8.17", "Gap", 0.6, "Clock synchronisation is not documented for in-scope systems.", [], "Confirm and document time-source synchronisation for in-scope systems."),
  F("A.8.18", "Gap", 0.58, "No control is described over utility programs capable of overriding system or application controls.", [], "Restrict and log the use of privileged utility programs."),
  F("A.8.19", "Partial", 0.58, "The deployment pipeline controls changes to production, but there is no explicit rule set for installing software on operational systems.", [[DEV, "Deployments to production are automated and logged, and\ncan be rolled back."]], "Document rules for installing and updating software on operational systems."),
  F("A.8.20", "Partial", 0.6, "VPC, mTLS and VPN protections are in place, but there is no network security policy or standard.", [[CRY, "Internal service-to-service traffic in the production VPC uses mTLS."]], "Document network security controls and management responsibilities."),
  F("A.8.21", "Partial", 0.52, "VPN and VPC controls are referenced, but the security features and service levels of network services are not documented.", [[AUP, "production access additionally requires the company VPN and a hardware key."]], "Document the security mechanisms and service levels for network services."),
  F("A.8.22", "Partial", 0.6, "Environments are separated into distinct AWS accounts, but network-level segmentation within production is not detailed.", [[DEV, "Development, staging and production are separate AWS accounts."]], "Document the network segmentation design within the production environment."),
  F("A.8.23", "Gap", 0.62, "No web or DNS filtering is described for managed endpoints.", [], "Implement DNS/web filtering on managed devices and record it."),
  F("A.8.24", "Met", 0.85, "Encryption in transit and at rest with KMS customer-managed keys and annual rotation is defined.", [[CRY, "encrypted with AES-256 using\nAWS KMS customer-managed keys."]]),
  F("A.8.25", "Met", 0.8, "Secure development rules cover environments, review, CI security gates and testing.", [[DEV, "All changes go through pull request with at least one peer review and a passing CI pipeline."]]),
  F("A.8.26", "Partial", 0.58, "A secure coding guide exists, but security requirements are not formally specified and approved per application or major feature.", [[DEV, "Engineers follow the internal secure coding guide"]], "Add a step to specify and approve security requirements for new applications and major features."),
  F("A.8.27", "Gap", 0.7, "Secure architecture and engineering principles are not documented.", [[DEV, "Secure architecture principles are not written down."]], "Document secure system architecture and engineering principles and apply them in design reviews."),
  F("A.8.28", "Met", 0.78, "Secure coding principles are defined and enforced with static analysis.", [[DEV, "input validation, output encoding,\nparameterised queries, no secrets in code"]]),
  F("A.8.29", "Partial", 0.6, "SAST and weekly DAST run in the pipeline, but the annual penetration test is overdue and unscheduled.", [[EV, "10 months old"]], "Schedule the annual penetration test and define security test gates for releases."),
  F("A.8.30", "Not Applicable", 0.62, "All development is in-house; no outsourced development is described.", [], null),
  F("A.8.31", "Met", 0.85, "Development, staging and production are separate AWS accounts with no standing developer access to production.", [[DEV, "Developers have no standing\naccess to production."]]),
  F("A.8.32", "Met", 0.82, "Changes require peer-reviewed pull requests and a passing pipeline, with automated, reversible deployments.", [[DEV, "All changes go through pull request with at least one peer review and a passing CI pipeline."]]),
  F("A.8.33", "Met", 0.72, "Production data is never copied into lower environments.", [[DEV, "Production data is never copied into lower environments."]]),
  F("A.8.34", "Gap", 0.6, "There is no documented approach to planning and agreeing assurance testing on operational systems.", [], "Define how audit and assurance testing on production is planned and agreed with management."),
];

// ── integrity checks ─────────────────────────────────────────────────────────
const ids = new Set(findings.map((f) => f.controlId));
if (ids.size !== 93) console.warn(`WARN: expected 93 findings, got ${ids.size}`);
let quoteWarns = 0;
for (const f of findings) {
  for (const e of f.evidence) {
    const doc = NORM_DOCS[e.source];
    if (!doc) {
      console.warn(`WARN ${f.controlId}: unknown source "${e.source}"`);
      quoteWarns++;
    } else if (!doc.includes(norm(e.quote))) {
      console.warn(`WARN ${f.controlId}: quote not found in "${e.source}": ${e.quote.slice(0, 60)}...`);
      quoteWarns++;
    }
  }
  if ((f.verdict === "Met" || f.verdict === "Partial") && f.evidence.length === 0) {
    console.warn(`WARN ${f.controlId}: ${f.verdict} with no evidence`);
  }
}
console.log(quoteWarns === 0 ? "All evidence quotes verified against source docs." : `${quoteWarns} quote warning(s).`);

// ── summary ──────────────────────────────────────────────────────────────────
const W = { Met: 1, Partial: 0.5, Gap: 0, "Not Applicable": 1 };
let met = 0, partial = 0, gap = 0, na = 0;
for (const f of findings) {
  if (f.verdict === "Met") met++;
  else if (f.verdict === "Partial") partial++;
  else if (f.verdict === "Gap") gap++;
  else na++;
}
const scored = findings.filter((f) => f.verdict !== "Not Applicable");
const coverageScore = Math.round(
  (scored.reduce((s, f) => s + W[f.verdict], 0) / scored.length) * 100,
);

const result = {
  company: "Northwind Cloud Ltd",
  generatedAt: "2025-08-28T09:00:00.000Z",
  mode: "demo",
  model: null,
  documentsAnalyzed: [
    ...readdirSync(join(COMPANY_DIR, "policies")).filter((f) => f.endsWith(".md")).map((f) => {
      const c = readFileSync(join(COMPANY_DIR, "policies", f), "utf8");
      return (c.match(/^#\s+(.+)$/m) || [, f])[1].trim();
    }),
    EV,
  ],
  findings: findings.sort((a, b) =>
    a.controlId.localeCompare(b.controlId, undefined, { numeric: true }),
  ),
  summary: { met, partial, gap, notApplicable: na, coverageScore },
};

const outDir = join(ROOT, "data", "fixtures");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "analysis.json"), JSON.stringify(result, null, 2) + "\n");
console.log(
  `Wrote data/fixtures/analysis.json — ${findings.length} findings ` +
    `(Met ${met} / Partial ${partial} / Gap ${gap} / N/A ${na}), coverage ${coverageScore}/100`,
);
