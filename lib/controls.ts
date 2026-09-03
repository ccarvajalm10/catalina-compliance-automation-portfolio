import type { Control } from "./types";

/**
 * ISO/IEC 27001:2022 Annex A control catalogue (93 controls, 4 themes).
 *
 * Titles are the short reference labels from the standard. Each `objective` is an
 * ORIGINAL paraphrase written for this project describing the control's intent in
 * plain language. The copyrighted text of ISO/IEC 27001 and 27002 is NOT reproduced
 * here. Use this catalogue for orientation only, not as a substitute for the standard.
 */
export const CONTROLS: Control[] = [
  // ── A.5 Organizational ────────────────────────────────────────────────────────
  { id: "A.5.1", theme: "Organizational", title: "Policies for information security", objective: "A set of information security policies is defined, approved by management, published, communicated to staff and relevant parties, and reviewed on a schedule or after significant change." },
  { id: "A.5.2", theme: "Organizational", title: "Information security roles and responsibilities", objective: "Security responsibilities are allocated to named roles and documented so that ownership of assets, risks and processes is unambiguous." },
  { id: "A.5.3", theme: "Organizational", title: "Segregation of duties", objective: "Conflicting duties and areas of responsibility are separated to reduce the chance of unauthorised or unintentional modification or misuse of assets." },
  { id: "A.5.4", theme: "Organizational", title: "Management responsibilities", objective: "Management actively requires all personnel to apply information security in line with established policies and procedures." },
  { id: "A.5.5", theme: "Organizational", title: "Contact with authorities", objective: "Appropriate contacts with relevant authorities (e.g. regulators, law enforcement) are maintained and used when needed." },
  { id: "A.5.6", theme: "Organizational", title: "Contact with special interest groups", objective: "The organisation maintains contact with security forums and professional associations to stay current on threats and good practice." },
  { id: "A.5.7", theme: "Organizational", title: "Threat intelligence", objective: "Information about security threats is collected and analysed to produce actionable threat intelligence that informs controls." },
  { id: "A.5.8", theme: "Organizational", title: "Information security in project management", objective: "Information security is integrated into project management regardless of the project type." },
  { id: "A.5.9", theme: "Organizational", title: "Inventory of information and other associated assets", objective: "An inventory of information and associated assets, including owners, is developed and kept up to date." },
  { id: "A.5.10", theme: "Organizational", title: "Acceptable use of information and other associated assets", objective: "Rules for acceptable use and handling procedures for information and assets are identified, documented and implemented." },
  { id: "A.5.11", theme: "Organizational", title: "Return of assets", objective: "Personnel and other parties return all organisational assets in their possession on termination or change of their engagement." },
  { id: "A.5.12", theme: "Organizational", title: "Classification of information", objective: "Information is classified according to confidentiality, integrity, availability and relevant stakeholder requirements." },
  { id: "A.5.13", theme: "Organizational", title: "Labelling of information", objective: "An appropriate set of procedures for labelling information is developed and implemented in line with the classification scheme." },
  { id: "A.5.14", theme: "Organizational", title: "Information transfer", objective: "Transfer rules, procedures and agreements are in place for all types of transfer within the organisation and with external parties." },
  { id: "A.5.15", theme: "Organizational", title: "Access control", objective: "Rules to control physical and logical access to information and assets are established and implemented based on business and security requirements." },
  { id: "A.5.16", theme: "Organizational", title: "Identity management", objective: "The full life cycle of identities is managed, from creation through change to removal." },
  { id: "A.5.17", theme: "Organizational", title: "Authentication information", objective: "Allocation and management of authentication information is controlled, and users are advised on handling it securely." },
  { id: "A.5.18", theme: "Organizational", title: "Access rights", objective: "Access rights are provisioned, reviewed, modified and removed in line with the access control policy." },
  { id: "A.5.19", theme: "Organizational", title: "Information security in supplier relationships", objective: "Processes and procedures manage the security risks associated with the use of suppliers' products and services." },
  { id: "A.5.20", theme: "Organizational", title: "Addressing information security within supplier agreements", objective: "Relevant security requirements are established and agreed with each supplier based on the type of supplier relationship." },
  { id: "A.5.21", theme: "Organizational", title: "Managing information security in the ICT supply chain", objective: "Risks associated with the ICT products and services supply chain are managed." },
  { id: "A.5.22", theme: "Organizational", title: "Monitoring, review and change management of supplier services", objective: "Supplier service delivery is monitored, reviewed, evaluated and changes are managed." },
  { id: "A.5.23", theme: "Organizational", title: "Information security for use of cloud services", objective: "Acquisition, use, management and exit for cloud services follow the organisation's security requirements." },
  { id: "A.5.24", theme: "Organizational", title: "Information security incident management planning and preparation", objective: "The organisation plans and prepares for incident management by defining roles, responsibilities and processes." },
  { id: "A.5.25", theme: "Organizational", title: "Assessment and decision on information security events", objective: "Security events are assessed and a decision is made on whether they are to be categorised as incidents." },
  { id: "A.5.26", theme: "Organizational", title: "Response to information security incidents", objective: "Incidents are responded to in accordance with documented procedures." },
  { id: "A.5.27", theme: "Organizational", title: "Learning from information security incidents", objective: "Knowledge gained from incidents is used to strengthen and improve controls." },
  { id: "A.5.28", theme: "Organizational", title: "Collection of evidence", objective: "Procedures for the identification, collection, acquisition and preservation of evidence related to security events are established." },
  { id: "A.5.29", theme: "Organizational", title: "Information security during disruption", objective: "The organisation plans how to maintain information security at an appropriate level during disruption." },
  { id: "A.5.30", theme: "Organizational", title: "ICT readiness for business continuity", objective: "ICT readiness is planned, implemented, maintained and tested against business continuity objectives and requirements." },
  { id: "A.5.31", theme: "Organizational", title: "Legal, statutory, regulatory and contractual requirements", objective: "Applicable legal, regulatory and contractual requirements and the organisation's approach to meeting them are identified, documented and kept current." },
  { id: "A.5.32", theme: "Organizational", title: "Intellectual property rights", objective: "The organisation implements procedures to protect intellectual property rights." },
  { id: "A.5.33", theme: "Organizational", title: "Protection of records", objective: "Records are protected from loss, destruction, falsification, unauthorised access and unauthorised release." },
  { id: "A.5.34", theme: "Organizational", title: "Privacy and protection of PII", objective: "Requirements for the protection of personally identifiable information are identified and met per applicable law and regulation." },
  { id: "A.5.35", theme: "Organizational", title: "Independent review of information security", objective: "The organisation's approach to managing information security is reviewed independently at planned intervals or after significant change." },
  { id: "A.5.36", theme: "Organizational", title: "Compliance with policies, rules and standards for information security", objective: "Compliance with the organisation's security policies, rules and standards is regularly reviewed." },
  { id: "A.5.37", theme: "Organizational", title: "Documented operating procedures", objective: "Operating procedures for information processing facilities are documented and made available to personnel who need them." },

  // ── A.6 People ───────────────────────────────────────────────────────────────
  { id: "A.6.1", theme: "People", title: "Screening", objective: "Background verification checks on candidates are carried out prior to joining and on an ongoing basis, proportionate to business requirements and risk." },
  { id: "A.6.2", theme: "People", title: "Terms and conditions of employment", objective: "Employment agreements state the personnel's and the organisation's responsibilities for information security." },
  { id: "A.6.3", theme: "People", title: "Information security awareness, education and training", objective: "Personnel receive appropriate awareness, education and training, with updates to policies relevant to their role." },
  { id: "A.6.4", theme: "People", title: "Disciplinary process", objective: "A formal, communicated disciplinary process exists to act against personnel who have committed a security policy violation." },
  { id: "A.6.5", theme: "People", title: "Responsibilities after termination or change of employment", objective: "Security responsibilities that remain valid after termination or change of employment are defined, enforced and communicated." },
  { id: "A.6.6", theme: "People", title: "Confidentiality or non-disclosure agreements", objective: "Confidentiality or NDA requirements are identified, documented, regularly reviewed and signed by personnel and relevant parties." },
  { id: "A.6.7", theme: "People", title: "Remote working", objective: "Security measures are implemented when personnel work remotely to protect information accessed, processed or stored outside premises." },
  { id: "A.6.8", theme: "People", title: "Information security event reporting", objective: "A mechanism lets personnel report observed or suspected security events through appropriate channels in a timely manner." },

  // ── A.7 Physical ─────────────────────────────────────────────────────────────
  { id: "A.7.1", theme: "Physical", title: "Physical security perimeters", objective: "Security perimeters are defined and used to protect areas that contain information and associated assets." },
  { id: "A.7.2", theme: "Physical", title: "Physical entry", objective: "Secure areas are protected by appropriate entry controls and access points." },
  { id: "A.7.3", theme: "Physical", title: "Securing offices, rooms and facilities", objective: "Physical security for offices, rooms and facilities is designed and implemented." },
  { id: "A.7.4", theme: "Physical", title: "Physical security monitoring", objective: "Premises are continuously monitored for unauthorised physical access." },
  { id: "A.7.5", theme: "Physical", title: "Protecting against physical and environmental threats", objective: "Protection is designed and implemented against physical and environmental threats such as natural disasters and intentional attack." },
  { id: "A.7.6", theme: "Physical", title: "Working in secure areas", objective: "Security measures for working in secure areas are designed and implemented." },
  { id: "A.7.7", theme: "Physical", title: "Clear desk and clear screen", objective: "Clear desk rules for papers and media and clear screen rules for processing facilities are defined and enforced." },
  { id: "A.7.8", theme: "Physical", title: "Equipment siting and protection", objective: "Equipment is sited securely and protected." },
  { id: "A.7.9", theme: "Physical", title: "Security of assets off-premises", objective: "Off-site assets are protected." },
  { id: "A.7.10", theme: "Physical", title: "Storage media", objective: "Storage media is managed through its life cycle of acquisition, use, transportation and disposal per the classification scheme and handling requirements." },
  { id: "A.7.11", theme: "Physical", title: "Supporting utilities", objective: "Information processing facilities are protected from power failures and other disruptions caused by failures in supporting utilities." },
  { id: "A.7.12", theme: "Physical", title: "Cabling security", objective: "Cables carrying power, data or supporting information services are protected from interception, interference or damage." },
  { id: "A.7.13", theme: "Physical", title: "Equipment maintenance", objective: "Equipment is maintained correctly to ensure availability, integrity and confidentiality of information." },
  { id: "A.7.14", theme: "Physical", title: "Secure disposal or re-use of equipment", objective: "Items of equipment containing storage media are verified to ensure sensitive data and licensed software are removed or securely overwritten before disposal or re-use." },

  // ── A.8 Technological ────────────────────────────────────────────────────────
  { id: "A.8.1", theme: "Technological", title: "User endpoint devices", objective: "Information stored on, processed by or accessible via user endpoint devices is protected." },
  { id: "A.8.2", theme: "Technological", title: "Privileged access rights", objective: "The allocation and use of privileged access rights is restricted and managed." },
  { id: "A.8.3", theme: "Technological", title: "Information access restriction", objective: "Access to information and other associated assets is restricted in accordance with the access control policy." },
  { id: "A.8.4", theme: "Technological", title: "Access to source code", objective: "Read and write access to source code, development tools and software libraries is appropriately managed." },
  { id: "A.8.5", theme: "Technological", title: "Secure authentication", objective: "Secure authentication technologies and procedures are implemented based on access restrictions and the access control policy." },
  { id: "A.8.6", theme: "Technological", title: "Capacity management", objective: "The use of resources is monitored and adjusted in line with current and expected capacity requirements." },
  { id: "A.8.7", theme: "Technological", title: "Protection against malware", objective: "Protection against malware is implemented and supported by appropriate user awareness." },
  { id: "A.8.8", theme: "Technological", title: "Management of technical vulnerabilities", objective: "Information about technical vulnerabilities of systems in use is obtained, exposure is evaluated and appropriate measures are taken." },
  { id: "A.8.9", theme: "Technological", title: "Configuration management", objective: "Configurations, including security configurations, of hardware, software, services and networks are established, documented, implemented, monitored and reviewed." },
  { id: "A.8.10", theme: "Technological", title: "Information deletion", objective: "Information stored in systems, devices or any other storage media is deleted when no longer required." },
  { id: "A.8.11", theme: "Technological", title: "Data masking", objective: "Data masking is used in line with the access control policy and business requirements, taking applicable legislation into account." },
  { id: "A.8.12", theme: "Technological", title: "Data leakage prevention", objective: "Data leakage prevention measures are applied to systems, networks and devices that process, store or transmit sensitive information." },
  { id: "A.8.13", theme: "Technological", title: "Information backup", objective: "Backup copies of information, software and systems are maintained and regularly tested per the agreed backup policy." },
  { id: "A.8.14", theme: "Technological", title: "Redundancy of information processing facilities", objective: "Information processing facilities are implemented with sufficient redundancy to meet availability requirements." },
  { id: "A.8.15", theme: "Technological", title: "Logging", objective: "Logs recording activities, exceptions, faults and other relevant events are produced, stored, protected and analysed." },
  { id: "A.8.16", theme: "Technological", title: "Monitoring activities", objective: "Networks, systems and applications are monitored for anomalous behaviour and appropriate actions taken to evaluate potential incidents." },
  { id: "A.8.17", theme: "Technological", title: "Clock synchronization", objective: "The clocks of information processing systems are synchronised to approved time sources." },
  { id: "A.8.18", theme: "Technological", title: "Use of privileged utility programs", objective: "The use of utility programs capable of overriding system and application controls is restricted and tightly controlled." },
  { id: "A.8.19", theme: "Technological", title: "Installation of software on operational systems", objective: "Procedures and measures are implemented to securely manage software installation on operational systems." },
  { id: "A.8.20", theme: "Technological", title: "Networks security", objective: "Networks and network devices are secured, managed and controlled to protect information in systems and applications." },
  { id: "A.8.21", theme: "Technological", title: "Security of network services", objective: "Security mechanisms, service levels and requirements of network services are identified, implemented and monitored." },
  { id: "A.8.22", theme: "Technological", title: "Segregation of networks", objective: "Groups of information services, users and systems are segregated in the organisation's networks." },
  { id: "A.8.23", theme: "Technological", title: "Web filtering", objective: "Access to external websites is managed to reduce exposure to malicious content." },
  { id: "A.8.24", theme: "Technological", title: "Use of cryptography", objective: "Rules for the effective use of cryptography, including key management, are defined and implemented." },
  { id: "A.8.25", theme: "Technological", title: "Secure development life cycle", objective: "Rules for the secure development of software and systems are established and applied." },
  { id: "A.8.26", theme: "Technological", title: "Application security requirements", objective: "Information security requirements are identified, specified and approved when developing or acquiring applications." },
  { id: "A.8.27", theme: "Technological", title: "Secure system architecture and engineering principles", objective: "Principles for engineering secure systems are established, documented, maintained and applied to development activities." },
  { id: "A.8.28", theme: "Technological", title: "Secure coding", objective: "Secure coding principles are applied to software development." },
  { id: "A.8.29", theme: "Technological", title: "Security testing in development and acceptance", objective: "Security testing processes are defined and implemented in the development life cycle." },
  { id: "A.8.30", theme: "Technological", title: "Outsourced development", objective: "The organisation directs, monitors and reviews activities related to outsourced system development." },
  { id: "A.8.31", theme: "Technological", title: "Separation of development, test and production environments", objective: "Development, testing and production environments are separated and secured." },
  { id: "A.8.32", theme: "Technological", title: "Change management", objective: "Changes to information processing facilities and systems are subject to change management procedures." },
  { id: "A.8.33", theme: "Technological", title: "Test information", objective: "Test information is appropriately selected, protected and managed." },
  { id: "A.8.34", theme: "Technological", title: "Protection of information systems during audit testing", objective: "Audit tests and other assurance activities involving assessment of operational systems are planned and agreed between tester and management." },
];

export const CONTROLS_BY_ID: Record<string, Control> = Object.fromEntries(
  CONTROLS.map((c) => [c.id, c]),
);

export const THEMES: Control["theme"][] = [
  "Organizational",
  "People",
  "Physical",
  "Technological",
];
