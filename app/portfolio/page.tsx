import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/Reveal";
import { GridBackground } from "@/components/effects/GridBackground";
import { PROJECTS } from "@/lib/projects";
import { ProjectVisual } from "@/components/sections/FeaturedWork";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "A selection of PhiBrain's recent product work across fintech, healthcare, logistics, commerce, real estate and SaaS.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-20">
        <GridBackground fade="radial" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(41,171,226,0.25), transparent 70%)",
          }}
        />
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="default" className="uppercase tracking-[0.18em]">
                Case studies
              </Badge>
              <h1 className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance">
                <span className="gradient-text-soft">Premium products,</span>{" "}
                <span className="gradient-text">shipped end-to-end.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                Each project is a real partnership — strategy, design,
                engineering and operations — presented with the outcomes that
                actually mattered to our partners.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="container space-y-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                href={`/portfolio/${p.slug}`}
                aria-label={`${p.shortTitle} — read the case study`}
                className="group relative grid scroll-mt-32 gap-8 overflow-hidden rounded-3xl border border-black/[0.06] bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-elevation-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:grid-cols-12 md:p-8 dark:border-white/[0.06] dark:bg-ink-900/60"
              >
                <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {p.category} · {p.year}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl text-balance">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <ul className="mt-6 grid grid-cols-3 gap-2">
                    {p.outcomes.map((o) => (
                      <li
                        key={o.label}
                        className="rounded-xl border border-black/[0.05] bg-white/70 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]"
                      >
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {o.label}
                        </div>
                        <div className="mt-1 font-display text-base font-semibold tracking-tight">
                          {o.value}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
                    Read the case study
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className={`md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
                  <ProjectVisual variant={p.visual} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
