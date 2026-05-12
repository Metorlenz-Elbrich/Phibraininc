export const siteConfig = {
  name: "PhiBrain",
  legalName: "PhiBrain Inc.",
  tagline: "Engineering software that compounds your business advantage.",
  description:
    "PhiBrain is a senior product engineering studio crafting secure web platforms, cross-platform mobile products, premium UI/UX, scalable APIs and modernized cloud systems for enterprise teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phibrain.com",
  contactEmail: "hello@phibrain.com",
  locale: "en-US",
  themeColor: "#0C0D0F",

  /** Primary CTA wording — used across navbar, hero, and conversion sections. */
  primaryCta: {
    label: "Book a discovery call",
    href: "/contact",
  },

  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],

  /** Footer legal navigation — always visible in the footer's last column. */
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
    { label: "Security statement", href: "/security" },
  ],

  social: {
    linkedin: "https://www.linkedin.com/company/phibrain",
    github: "https://github.com/phibraininc",
    twitter: "https://twitter.com/phibrain",
  },
} as const;

export type SiteConfig = typeof siteConfig;
