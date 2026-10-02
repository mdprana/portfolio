// Single source of truth for profile-level content.
// ponytail: flat module, not a CMS. Swap for MDX/JSON when project count > 6.

export const site = {
  name: "Made Pranajaya Dibyacita",
  wordmark: "PRANA",
  headline: "prana",
  role: "Data Science & Machine Learning",
  intro:
    "I build machine learning systems end to end — from multilingual data pipelines to the interfaces people actually use.",
  email: "mdpranajaya@gmail.com",
  location: "Bali, Indonesia",
  timezone: "Asia/Makassar",
  timezoneLabel: "WITA",
  socials: {
    github: "https://github.com/mdprana",
    linkedin: "https://linkedin.com/in/mdprana",
    threads: "https://www.threads.com/@mdprana",
  },
  nav: [
    { label: "PROJECTS", href: "/projects" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ],
} as const;
