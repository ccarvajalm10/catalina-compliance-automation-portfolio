/**
 * Portfolio site content. EDIT THIS FILE — nothing else in the app needs changing.
 * The `links` block still has placeholders: fill in your real URLs.
 */
export const siteConfig = {
  author: {
    name: "Catalina Carvajal M.",
    title: "Compliance Lawyer & AI-Native Technologist",
    bio: "AI-native tech-focused compliance legal professional. MSc in Law, Data & AI (Cybersecurity) from Universidad de León, AI Ethics from Università di Pisa. CIPM and CIPP/E certified.",
    location: "Dublin, Ireland",
    email: "catalinacarvajalm3@gmail.com",
  },

  // Professional background (shown on landing page)
  background: {
    intro:
      "I'm an AI-native tech-focused compliance legal professional completing a Master's in Law, Data and AI, with a specialisation in Cybersecurity from Universidad de León (Spain) and AI Ethics from Università di Pisa. CIPM and CIPP/E certified.",
    expertise: [
      "Risk management and internal controls",
      "ISO 27001",
      "SOC 2",
      "Scalable compliance operations",
      "AI and automation for compliance workflows",
    ],
    approach:
      "I enjoy solving complex problems, working across teams and turning requirements into practical solutions that improve how people and businesses work.",
    mission:
      "Through my Master's in Law, Data & AI (EMILDAI), I've developed a multidisciplinary perspective across technology, data and business, with a particular focus on digital transformation and responsible AI. I'm especially interested in how data and AI can improve workflows, products and user experiences at scale.",
    cta:
      "I'm interested in building tools that make your compliance programs faster. This site is a working demo of one such tool — an ISO/IEC 27001:2022 gap analyser — plus a written case study of the process change around it.",
  },

  // TODO: replace with your real URLs
  links: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    // the repo this project lives in, once you push it
    repo: "https://github.com/your-handle/compliance-automation-portfolio",
  },
} as const;
