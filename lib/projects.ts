export type ProjectVisual =
  | "fintech"
  | "logistics"
  | "healthcare"
  | "ecommerce"
  | "realestate"
  | "saas";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  /** Multi-paragraph description used on the case-study detail page. */
  description: string[];
  challenge: string;
  solution: string;
  architecture: string[];
  security: string[];
  tags: string[];
  outcomes: { label: string; value: string }[];
  year: string;
  duration: string;
  visual: ProjectVisual;
};

export const PROJECTS: Project[] = [
  {
    slug: "orbit",
    shortTitle: "Orbit",
    title: "Orbit — Investment dashboard for a private bank",
    category: "Fintech",
    summary:
      "A real-time portfolio cockpit serving 47k active investors with sub-100ms updates, compliance reporting and biometric mobile sign-in.",
    description: [
      "Orbit replaces a legacy advisor platform with a streaming-first product. The new dashboard centralises portfolio performance, market data, compliance reporting and client communication in a single workspace.",
      "Deployed across web and native mobile clients, Orbit became the daily cockpit for 47,000 active investors and 280 wealth advisors, with audit-grade traceability for every action.",
    ],
    challenge:
      "An ageing internal advisor tool struggled to handle modern market data feeds and could not be opened by clients directly. Advisors were duplicating data into spreadsheets, conversion was stagnating and the compliance team flagged increasing audit gaps.",
    solution:
      "We rebuilt the platform on Next.js with an Edge-rendered shell, a streaming WebSocket data layer for live quotes and portfolio recalculation, and a React Native companion app with biometric sign-in. Compliance reporting was moved into the same audit trail used by the trading engine.",
    architecture: [
      "Next.js App Router with Edge SSR for the public marketing surface and Node SSR for authenticated dashboards.",
      "Streaming WebSocket gateway with backpressure-aware fan-out to 47k concurrent clients.",
      "Postgres + TimescaleDB for portfolio history; Redis for hot quote cache.",
      "Identity via OAuth 2.0 / OIDC with passkeys, plus biometric WebAuthn on mobile.",
      "Event-sourced audit trail piped to a SIEM for compliance.",
    ],
    security: [
      "OWASP-aligned threat model & quarterly external pen-test.",
      "Strict CSP with per-request nonces; HSTS preload; SameSite=Lax cookies.",
      "Row-level security at the database layer for every tenant boundary.",
      "Signed, short-lived API tokens with rotation; secrets stored in a managed KMS.",
      "Full GDPR data flow with documented retention and deletion paths.",
    ],
    tags: ["Next.js", "Edge runtime", "WebSockets", "React Native", "PostgreSQL", "OAuth 2.0", "WebAuthn"],
    outcomes: [
      { label: "P95 latency", value: "84 ms" },
      { label: "Conversion", value: "+34%" },
      { label: "Time to insight", value: "−71%" },
    ],
    year: "2025",
    duration: "9 months",
    visual: "fintech",
  },
  {
    slug: "atlas",
    shortTitle: "Atlas",
    title: "Atlas — Global logistics operations platform",
    category: "Logistics",
    summary:
      "Multi-carrier shipment orchestration with live tracking, customs automation and ML-based ETA prediction across 38 ports.",
    description: [
      "Atlas unifies eight legacy logistics systems behind a single, typed API. Operators get real-time vessel positions, automated customs paperwork and ML-based ETA forecasting, with full audit trail for regulators.",
      "It replaced a tangle of inboxes and spreadsheets with one product, used daily by 600+ operators across 14 carriers and 38 ports.",
    ],
    challenge:
      "Operations were splintered across eight inherited systems acquired over a decade. Manual customs paperwork was the #1 source of late shipments. Carrier APIs were each idiosyncratic, and no one had a single view of the fleet.",
    solution:
      "We built Atlas as a typed integration layer in front of the legacy systems, then incrementally moved features into the new product. Customs paperwork is now generated automatically from canonical shipment data, with human approval gates for edge cases.",
    architecture: [
      "Node.js + tRPC API gateway in front of 14 carrier integrations, normalising every payload into a typed canonical schema.",
      "Kafka event stream feeding ML ETA prediction service (Python) and the live tracking UI.",
      "Mapbox vector tiles for real-time vessel position visualisation.",
      "Terraform-managed AWS infrastructure with VPC peering to legacy systems for incremental migration.",
    ],
    security: [
      "Role-based access (Operator / Customs / Manager / Regulator) with fine-grained per-shipment ACLs.",
      "All API calls signed with short-lived JWTs; mTLS for legacy system bridges.",
      "Append-only audit log replicated to immutable storage for regulators.",
      "Dependency scanning, secret scanning and Renovate in CI/CD.",
    ],
    tags: ["Node.js", "tRPC", "PostgreSQL", "Kafka", "Mapbox", "Terraform", "AWS"],
    outcomes: [
      { label: "On-time deliveries", value: "+22%" },
      { label: "Manual ops", value: "−63%" },
      { label: "Carrier APIs", value: "14 integrated" },
    ],
    year: "2024",
    duration: "11 months",
    visual: "logistics",
  },
  {
    slug: "clinique",
    shortTitle: "Clinique",
    title: "Clinique — Patient and practitioner platform",
    category: "Healthcare",
    summary:
      "End-to-end telehealth experience: secure messaging, appointment scheduling, lab results and connected medical devices.",
    description: [
      "Clinique is HIPAA-aligned and GDPR-compliant from the ground up — featuring encrypted patient records, role-based access, audit trails, and a clean mobile UX for both patients and care teams.",
      "It now powers 12 clinics across three countries and supports 12+ connected medical devices for at-home monitoring.",
    ],
    challenge:
      "The clinic group had grown by acquisition and inherited four incompatible EHR systems. Patients filled paper forms, video consults happened on consumer apps, and lab results arrived by post. Compliance gaps were piling up.",
    solution:
      "We delivered a single patient & practitioner platform unifying records, scheduling, secure messaging, video consultation and lab integrations — with explicit, granular consent flows.",
    architecture: [
      "Next.js patient portal and clinician console, sharing a typed FHIR data layer.",
      "WebRTC video consultation with end-to-end encrypted signalling.",
      "HL7/FHIR bridges to existing EHR systems for migration windows.",
      "Encrypted-at-rest patient records (KMS-managed envelope encryption).",
      "Native iOS and Android companion app for at-home device pairing.",
    ],
    security: [
      "HIPAA-aligned controls: access logs, encryption-in-transit, encryption-at-rest, break-glass procedures.",
      "GDPR: explicit consent ledger, data portability and deletion endpoints.",
      "Per-resource RBAC at the data layer enforced via row-level security.",
      "Pen-tested before each major release; SOC 2 readiness in progress.",
    ],
    tags: ["Next.js", "FHIR", "HL7", "WebRTC", "HIPAA", "GDPR", "WebAuthn"],
    outcomes: [
      { label: "Patient NPS", value: "71" },
      { label: "Consult duration", value: "−18%" },
      { label: "Devices supported", value: "12+" },
    ],
    year: "2025",
    duration: "14 months",
    visual: "healthcare",
  },
  {
    slug: "vela",
    shortTitle: "Vela",
    title: "Vela — Luxury commerce ecosystem",
    category: "E-commerce",
    summary:
      "Headless storefront, native mobile companion and operator console for a multi-region premium fashion brand.",
    description: [
      "Vela powers web, mobile and in-store experiences from a single commerce backbone, with personalised recommendations, multi-currency checkout and a custom CMS for editorial storytelling.",
      "Nine markets, four warehouses, one platform — and a 41% mobile conversion uplift in the first quarter post-launch.",
    ],
    challenge:
      "Vela's previous Shopify theme couldn't keep up with the brand's editorial ambitions, and mobile performance was hurting conversion. In-store associates couldn't see online stock in real time.",
    solution:
      "We built a headless Hydrogen storefront, a custom Sanity-style CMS for editorial content, and a unified inventory layer connecting warehouses, web, mobile and in-store associates.",
    architecture: [
      "Next.js + Shopify Hydrogen storefront with edge caching and image optimisation.",
      "GraphQL data layer aggregating Shopify, Algolia and the in-house CMS.",
      "Stripe-powered multi-currency checkout with regional tax engines.",
      "React Native associate app with offline-safe order capture.",
    ],
    security: [
      "PCI-scope minimization — no card data touches our infrastructure (Stripe-hosted fields).",
      "Strict CSP, signed image URLs, rate-limited public APIs.",
      "Secrets in a managed vault; CI/CD with short-lived deploy tokens.",
    ],
    tags: ["Next.js", "Shopify Hydrogen", "GraphQL", "Algolia", "Stripe", "React Native"],
    outcomes: [
      { label: "Mobile conversion", value: "+41%" },
      { label: "Page weight", value: "−58%" },
      { label: "Markets live", value: "9" },
    ],
    year: "2024",
    duration: "7 months",
    visual: "ecommerce",
  },
  {
    slug: "domaine",
    shortTitle: "Domaine",
    title: "Domaine — Real estate intelligence platform",
    category: "Real estate",
    summary:
      "AI-assisted property valuation, deal flow management and digital signing for a network of European agencies.",
    description: [
      "Domaine combines public registry data, agent insights and market comparables to deliver instant valuations. Agents close deals end-to-end inside the platform — from listing to legally binding e-signature.",
      "Today, Domaine powers 84 agencies and manages 120,000+ active listings across France, Belgium and Switzerland.",
    ],
    challenge:
      "Agents juggled five separate tools to value, list, negotiate and close a property — losing time and exposing sensitive client data across spreadsheet exports and personal email.",
    solution:
      "We delivered a single workspace combining valuation, listing, CRM, document signing and reporting. Sensitive data never leaves the platform; everything is signed, encrypted and traceable.",
    architecture: [
      "Next.js workspace with multi-tenant isolation per agency.",
      "Python-based valuation engine consuming public registry, comparables and agent input.",
      "Mapbox-powered cartography with cadastral overlays.",
      "DocuSign integration for legally binding signing, with audit trail.",
    ],
    security: [
      "Tenant-isolated storage and database schemas.",
      "End-to-end audit log for any document, signature or export.",
      "GDPR-aligned data retention and deletion flows.",
      "Quarterly dependency audit and secret rotation.",
    ],
    tags: ["Next.js", "Python", "PostgreSQL", "Mapbox", "Stripe", "DocuSign"],
    outcomes: [
      { label: "Listings managed", value: "120k+" },
      { label: "Deal close time", value: "−27%" },
      { label: "Agencies onboarded", value: "84" },
    ],
    year: "2024",
    duration: "10 months",
    visual: "realestate",
  },
  {
    slug: "lumen",
    shortTitle: "Lumen",
    title: "Lumen — SaaS admin platform for an analytics startup",
    category: "SaaS",
    summary:
      "A multi-tenant admin platform: billing, RBAC, audit logs, usage metering and customer health scoring — all in one console.",
    description: [
      "Lumen replaces a tangle of internal tools with one polished admin product. Tenant isolation, granular roles, Stripe billing, SOC 2-ready audit trails and customer health scoring all live in a single console.",
      "Their support team now resolves 44% fewer tickets, and onboarding new tenants takes minutes instead of days.",
    ],
    challenge:
      "Lumen's internal team had to context-switch between Stripe, Retool, Notion and ad-hoc SQL to answer basic customer questions. Onboarding new tenants required engineering tickets, and SOC 2 was on the roadmap with no plan.",
    solution:
      "We built a single internal admin product — typed, audited and role-aware — covering tenants, billing, usage, RBAC, audit trail, customer health and runbooks.",
    architecture: [
      "Next.js + tRPC + Drizzle ORM, full type safety end-to-end.",
      "Tenant-aware data layer with explicit access control per query.",
      "Stripe Billing + Stripe Tax with webhook reconciliation.",
      "Auth via Clerk with org-scoped sessions and SCIM provisioning.",
      "Audit trail written to an append-only WORM store for SOC 2.",
    ],
    security: [
      "SOC 2-ready audit logging, dedicated incident-response runbook.",
      "RBAC with least-privilege defaults, scoped per tenant.",
      "Webhook signature verification on every external event.",
      "Secrets in environment-isolated vaults; rotating deploy tokens.",
    ],
    tags: ["Next.js", "tRPC", "Drizzle", "Stripe", "Clerk", "Vercel"],
    outcomes: [
      { label: "Time saved / week", value: "32h" },
      { label: "Support tickets", value: "−44%" },
      { label: "Tenants", value: "1,200+" },
    ],
    year: "2025",
    duration: "6 months",
    visual: "saas",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
