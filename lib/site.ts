export const siteConfig = {
  name: "PhiBrain",
  legalName: "PhiBrain Inc.",
  tagline: "Build the products that move your business forward.",
  description:
    "PhiBrain is a product engineering studio crafting custom web and mobile applications, premium UI/UX, secure APIs and scalable cloud platforms for ambitious teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phibrain.com",
  contactEmail: "hello@phibrain.com",
  locale: "en-US",
  themeColor: "#0C0D0F",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/phibrain",
    github: "https://github.com/phibraininc",
    twitter: "https://twitter.com/phibrain",
  },
} as const;

export type SiteConfig = typeof siteConfig;
