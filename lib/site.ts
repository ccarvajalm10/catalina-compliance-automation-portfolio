/**
 * Portfolio content. EDIT THIS FILE. Nothing else in the app needs changing.
 */
export const siteConfig = {
  author: {
    name: "Catalina Carvajal M.",
    title: "AI & Compliance Legal Specialist",
    location: "Dublin, Ireland",
    email: "catalinacarvajalm3@gmail.com",
    // file lives in /public. Set to "" to hide the portrait.
    photo: "/catalina.jpg",
  },

  /** The portfolio as a whole. Shown in the hero. */
  portfolio: {
    kicker: "Portfolio",
    tagline: "Using AI to make compliance work faster.",
    lede: "I am an AI-focused compliance legal specialist. This site collects case studies where I take a slow, document-heavy compliance process, rebuild it with AI, and measure what actually changed. Each case study ships as a tool you can open, not a slide deck.",
  },

  /** Shown in the About section. */
  about: {
    bio: "AI-focused compliance legal specialist. Completing an MSc in Law, Data and AI (EMILDAI) with a specialisation in Cybersecurity at Universidad de León and AI Ethics at Università di Pisa. CIPM and CIPP/E certified.",
    background:
      "My background is multidisciplinary across technology, data and business. Before moving into Law, Data and AI, I worked in a compliance team at a law firm in Colombia, where much of the work was manual assessment of organisations against control frameworks. This portfolio is where I show how that work changes when AI does the first pass.",
    expertise: [
      "ISO/IEC 27001",
      "SOC 2",
      "GDPR, NIS2, AI Act",
      "Risk management and internal controls",
      "AI and automation for compliance workflows",
    ],
  },

  links: {
    linkedin: "https://www.linkedin.com/in/catalinacarvajalm/",
    github: "https://github.com/ccarvajalm10",
    // update once you create and push the repo
    repo: "https://github.com/ccarvajalm10/compliance-automation-portfolio",
  },

  /** Downloadable working templates, served from /public/templates. */
  templates: [
    {
      file: "/templates/ISO27001-2022-Self-Assessment.xlsx",
      name: "ISO/IEC 27001:2022 self-assessment",
      note: "Control-by-control questionnaire across the four Annex A themes, with maturity scoring. A working template I have used to run readiness assessments in practice.",
    },
    {
      file: "/templates/ISO27001-2022-Gap-Analysis-and-SoA.xlsx",
      name: "Gap analysis and Statement of Applicability",
      note: "Gap register plus a Statement of Applicability tab: applicable yes or no, implemented status, and a justification column for every one of the 93 controls.",
    },
  ],
} as const;
