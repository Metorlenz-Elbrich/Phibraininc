export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  outcomes: { label: string; value: string }[];
  year: string;
  visual:
    | "fintech"
    | "logistics"
    | "healthcare"
    | "ecommerce"
    | "realestate"
    | "saas";
};

export const PROJECTS: Project[] = [
  {
    slug: "orbit-fintech",
    title: "Orbit — Investment dashboard for a private bank",
    category: "Fintech",
    summary:
      "A real-time portfolio cockpit serving 47k active investors with sub-100ms updates, compliance reporting and biometric mobile sign-in.",
    description:
      "We rebuilt a legacy advisor platform into a streaming-first product. The new Orbit dashboard centralises portfolio performance, market data, compliance reporting and client communication in a single workspace, deployed across web and native mobile clients.",
    tags: ["Next.js", "Edge runtime", "WebSockets", "React Native", "Postgres", "OAuth 2.0"],
    outcomes: [
      { label: "P95 latency", value: "84 ms" },
      { label: "Conversion", value: "+34%" },
      { label: "Time to insight", value: "−71%" },
    ],
    year: "2025",
    visual: "fintech",
  },
  {
    slug: "atlas-logistics",
    title: "Atlas — Global logistics operations platform",
    category: "Logistics",
    summary:
      "Multi-carrier shipment orchestration with live tracking, customs automation and ETA prediction across 38 ports.",
    description:
      "Atlas unifies eight legacy logistics systems behind a single API. Operators get real-time vessel positions, automated customs paperwork and ML-based ETA forecasting, with full audit trail for regulators.",
    tags: ["Node.js", "PostgreSQL", "Kafka", "Mapbox", "Terraform", "AWS"],
    outcomes: [
      { label: "On-time deliveries", value: "+22%" },
      { label: "Manual ops", value: "−63%" },
      { label: "Carrier APIs", value: "14 integrated" },
    ],
    year: "2024",
    visual: "logistics",
  },
  {
    slug: "clinique-healthcare",
    title: "Clinique — Patient & practitioner platform",
    category: "Healthcare",
    summary:
      "End-to-end telehealth experience: secure messaging, appointment scheduling, lab results and connected medical devices.",
    description:
      "Clinique is HIPAA-aligned and GDPR-compliant from the ground up — featuring encrypted patient records, role-based access, audit trails, and a clean mobile UX for both patients and care teams.",
    tags: ["Next.js", "FHIR", "HL7", "WebRTC", "HIPAA", "GDPR"],
    outcomes: [
      { label: "Patient NPS", value: "71" },
      { label: "Consult duration", value: "−18%" },
      { label: "Devices supported", value: "12+" },
    ],
    year: "2025",
    visual: "healthcare",
  },
  {
    slug: "vela-ecommerce",
    title: "Vela — Luxury commerce ecosystem",
    category: "E-commerce",
    summary:
      "Headless storefront, native mobile companion and operator console for a multi-region premium fashion brand.",
    description:
      "Vela ships a single commerce backbone powering web, mobile and in-store experiences, with personalised product recommendations, multi-currency checkout and a custom CMS for editorial storytelling.",
    tags: ["Next.js", "Shopify Hydrogen", "GraphQL", "Algolia", "Stripe"],
    outcomes: [
      { label: "Mobile conversion", value: "+41%" },
      { label: "Page weight", value: "−58%" },
      { label: "Markets live", value: "9" },
    ],
    year: "2024",
    visual: "ecommerce",
  },
  {
    slug: "domaine-realestate",
    title: "Domaine — Real estate intelligence platform",
    category: "Real estate",
    summary:
      "AI-assisted property valuation, deal flow management and digital signing for a network of European agencies.",
    description:
      "Domaine combines public registry data, agent insights and market comparables to deliver instant valuations. Agents close deals end-to-end inside the platform — from listing to legally binding e-signature.",
    tags: ["Next.js", "Python", "Postgres", "Mapbox", "Stripe", "DocuSign"],
    outcomes: [
      { label: "Listings managed", value: "120k+" },
      { label: "Deal close time", value: "−27%" },
      { label: "Agencies onboarded", value: "84" },
    ],
    year: "2024",
    visual: "realestate",
  },
  {
    slug: "lumen-saas",
    title: "Lumen — SaaS admin platform for analytics",
    category: "SaaS",
    summary:
      "A multi-tenant admin platform for an analytics startup: billing, RBAC, audit logs, usage metering and customer health.",
    description:
      "Lumen replaces a tangle of internal tools with one polished admin product. Tenant isolation, granular roles, Stripe billing, SOC 2-ready audit trails and customer health scoring all live in a single console.",
    tags: ["Next.js", "tRPC", "Drizzle", "Stripe", "Clerk", "Vercel"],
    outcomes: [
      { label: "Time saved / week", value: "32h" },
      { label: "Support tickets", value: "−44%" },
      { label: "Tenants", value: "1,200+" },
    ],
    year: "2025",
    visual: "saas",
  },
];
