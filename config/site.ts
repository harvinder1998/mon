export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "ACCA Study Hub",
  description: "Your complete source for ACCA syllabus downloads, exam timetables, and comprehensive study resources. Download syllabus for all ACCA levels from F1 to P7.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acca-study-hub.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/accahub",
    linkedin: "https://linkedin.com/company/accahub",
  },
  nav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Syllabus",
      href: "/syllabus",
    },
    {
      title: "Timetables",
      href: "/timetables",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
