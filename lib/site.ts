/**
 * Portfolio site content. EDIT THIS FILE — every value here is a placeholder.
 * Nothing else in the app needs changing to make the site yours.
 */
export const siteConfig = {
  name: "Your Name",
  role: "GRC / Compliance Analyst — building AI into ISO 27001 programmes",
  // one or two sentences, first person
  intro:
    "I run information-security compliance programmes and build the tooling that makes them faster. This site is a working demo of one such tool — an ISO/IEC 27001:2022 gap analyser — plus a written case study of the process change around it.",
  location: "Remote / Europe",
  email: "you@example.com",
  links: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    // the repo this project lives in, once you push it
    repo: "https://github.com/your-handle/compliance-automation-portfolio",
  },
  // shown in the hero as social proof — swap for real frameworks / clients / certs
  credentials: [
    "ISO/IEC 27001 Lead Implementer",
    "SOC 2",
    "NIST CSF 2.0",
    "GDPR",
    "Cloud security (AWS)",
  ],
} as const;
