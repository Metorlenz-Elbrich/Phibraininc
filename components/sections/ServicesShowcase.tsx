import Link from "next/link";
import {
  Globe2,
  Smartphone,
  PenTool,
  Cable,
  Cloud,
  RefreshCw,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

export const services = [
  {
    id: "web",
    title: "Web applications",
    description:
      "Modern, conversion-driven web products built on Next.js, TypeScript and TailwindCSS — from marketing sites to complex SaaS dashboards.",
    Icon: Globe2,
    accent: "from-brand-500/30 to-brand-500/0",
  },
  {
    id: "mobile",
    title: "Mobile applications",
    description:
      "Native-grade iOS and Android experiences with React Native and Expo, including offline-first sync and biometric authentication.",
    Icon: Smartphone,
    accent: "from-violet-500/25 to-brand-500/0",
  },
  {
    id: "design",
    title: "UI / UX design",
    description:
      "Premium product design systems — wireframing, interaction design, motion, design tokens and component libraries that scale.",
    Icon: PenTool,
    accent: "from-fuchsia-500/25 to-brand-500/0",
  },
  {
    id: "api",
    title: "API engineering",
    description:
      "Secure, observable REST and GraphQL APIs with strong typing, rate limiting, audit logging and clean integrations.",
    Icon: Cable,
    accent: "from-emerald-500/25 to-brand-500/0",
  },
  {
    id: "cloud",
    title: "Cloud platforms",
    description:
      "Production-ready infrastructure on Vercel, AWS and GCP. CI/CD, infra-as-code, monitoring and zero-downtime deploys.",
    Icon: Cloud,
    accent: "from-sky-500/25 to-brand-500/0",
  },
  {
    id: "modernization",
    title: "Software modernization",
    description:
      "Lift legacy stacks to modern frameworks without breaking the business. Incremental migrations, strangler patterns, refactors.",
    Icon: RefreshCw,
    accent: "from-amber-500/25 to-brand-500/0",
  },
  {
    id: "support",
    title: "Maintenance & support",
    description:
      "Long-term partnership: patching, performance, security upgrades and feature delivery on a steady cadence.",
    Icon: Wrench,
    accent: "from-rose-500/25 to-brand-500/0",
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
                A full‑stack studio for{" "}
                <span className="gradient-text">premium products</span>
              </>
            }
            description="From discovery to launch, we cover every layer of modern software — design, engineering, infrastructure and post-launch evolution."
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
                className="group relative flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/10 bg-white/40 p-8 text-center transition-colors hover:border-brand-500/40 hover:bg-brand-500/[0.04] dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-transform group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="font-display text-base font-semibold tracking-tight">
                  See all services
                </div>
                <div className="text-sm text-muted-foreground">
                  Full capability map & engagements
                </div>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = service.Icon;
  return (
    <article
      id={service.id}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 p-7 backdrop-blur-xl transition-all duration-300",
        "shadow-elevation-1 hover:-translate-y-0.5 hover:shadow-elevation-3",
        "dark:border-white/[0.06] dark:bg-ink-900/60",
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
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
        Learn more
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
