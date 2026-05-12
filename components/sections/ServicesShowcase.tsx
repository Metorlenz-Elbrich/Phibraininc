import Link from "next/link";
import {
  ShieldCheck,
  Smartphone,
  PenTool,
  Cable,
  Cloud,
  RefreshCw,
  Wrench,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

export type Service = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "web",
    title: "Secure web platforms",
    description:
      "Production-grade Next.js applications engineered for performance, accessibility and OWASP-aligned security — from marketing surfaces to mission-critical SaaS.",
    Icon: ShieldCheck,
    accent: "from-brand-500/30 to-brand-500/0",
    bullets: [
      "Next.js · React · TypeScript",
      "Hardened HTTP headers, CSP, CSRF",
      "Edge rendering & ISR",
    ],
  },
  {
    id: "mobile",
    title: "Cross-platform mobile products",
    description:
      "Native-grade iOS and Android experiences shipped on a single codebase. Biometric auth, offline-first sync, deep-link integrations and store-ready CI/CD.",
    Icon: Smartphone,
    accent: "from-violet-500/25 to-brand-500/0",
    bullets: [
      "React Native · Expo",
      "Offline-first sync · Biometric auth",
      "Store submission & OTA updates",
    ],
  },
  {
    id: "design",
    title: "UI / UX product design",
    description:
      "Premium product design systems — research, IA, interaction design, motion and component libraries that scale across teams and brands.",
    Icon: PenTool,
    accent: "from-fuchsia-500/25 to-brand-500/0",
    bullets: [
      "Design tokens & systems",
      "Prototyping in Figma",
      "Accessibility-first UX",
    ],
  },
  {
    id: "api",
    title: "Backend & API engineering",
    description:
      "Typed, observable APIs with rate limiting, audit logging, role-based access and clean third-party integrations — built to be safe under real-world load.",
    Icon: Cable,
    accent: "from-emerald-500/25 to-brand-500/0",
    bullets: [
      "REST · GraphQL · tRPC",
      "Authn / Authz · RBAC",
      "Audit trails & metering",
    ],
  },
  {
    id: "cloud",
    title: "Cloud integration",
    description:
      "Production infrastructure on Vercel, AWS and GCP. Infra-as-code, CI/CD pipelines, observability, secrets management and zero-downtime deploys.",
    Icon: Cloud,
    accent: "from-sky-500/25 to-brand-500/0",
    bullets: [
      "Vercel · AWS · GCP · Cloudflare",
      "Terraform · GitHub Actions",
      "OpenTelemetry & Sentry",
    ],
  },
  {
    id: "modernization",
    title: "Software modernization",
    description:
      "Lift legacy stacks to modern frameworks without disrupting the business. Incremental migrations, strangler patterns, refactors and risk-managed rewrites.",
    Icon: RefreshCw,
    accent: "from-amber-500/25 to-brand-500/0",
    bullets: [
      "Strangler-fig migrations",
      "Monolith → modular",
      "Risk-managed rewrites",
    ],
  },
  {
    id: "support",
    title: "Maintenance & support",
    description:
      "A long-term engineering partnership: patching, performance, security upgrades and feature delivery on a steady, transparent cadence with SLAs.",
    Icon: Wrench,
    accent: "from-rose-500/25 to-brand-500/0",
    bullets: [
      "Quarterly security upgrades",
      "Performance SLAs",
      "Feature delivery on retainer",
    ],
  },
];

type Variant = "home" | "full";

export default function ServicesShowcase({ variant = "home" }: { variant?: Variant }) {
  const list = variant === "home" ? services.slice(0, 6) : services;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                A senior product studio for{" "}
                <span className="gradient-text">premium software</span>
              </>
            }
            description="From discovery to long-term operation, we deliver every layer of modern software — engineered with security and scale baked in from day one."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}

          {variant === "home" ? (
            <Reveal delay={list.length * 0.05}>
              <Link
                href="/services"
                className="group relative flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/10 bg-white/40 p-8 text-center transition-colors hover:border-brand-500/40 hover:bg-brand-500/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-transform group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="font-display text-base font-semibold tracking-tight">
                  See all capabilities
                </div>
                <div className="text-sm text-muted-foreground">
                  Full service map &amp; engagement models
                </div>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.Icon;
  const href = `/services#${service.id}`;
  return (
    <Link
      id={service.id}
      href={href}
      aria-label={`${service.title} — learn more`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 p-7 backdrop-blur-xl transition-all duration-300 scroll-mt-32",
        "shadow-elevation-1 hover:-translate-y-0.5 hover:shadow-elevation-3",
        "dark:border-white/[0.06] dark:bg-ink-900/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          service.accent,
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/0 blur-3xl transition-colors duration-500 group-hover:bg-brand-500/20"
      />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <ul className="mt-5 space-y-1.5 text-xs text-foreground/70">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-500" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
        Discuss this capability
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
