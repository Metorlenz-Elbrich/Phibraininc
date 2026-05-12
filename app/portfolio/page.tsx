import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/Reveal";
import { GridBackground } from "@/components/effects/GridBackground";
import { PROJECTS } from "@/lib/projects";
import { ProjectVisual } from "@/components/sections/FeaturedWork";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of PhiBrain's recent product work across fintech, healthcare, logistics, e-commerce, real estate and SaaS.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
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
                Portfolio
              </Badge>
              <h1 className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance">
                <span className="gradient-text-soft">Selected work,</span>{" "}
                <span className="gradient-text">shipped end-to-end.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                Each project is a real partnership — strategy, design,
                engineering and operations — represented here with the outcomes
                that mattered to our partners.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="relative py-16 md:py-20">
        <div className="container space-y-12">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <article
                id={p.slug}
                className="relative grid scroll-mt-32 gap-8 overflow-hidden rounded-3xl border border-black/[0.06] bg-white/70 p-6 backdrop-blur-xl md:grid-cols-12 md:p-8 dark:border-white/[0.06] dark:bg-ink-900/60"
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
                    {p.description}
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
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/[0.06] bg-white/80 px-2.5 py-1 text-[11px] font-medium text-foreground/80 dark:border-white/[0.06] dark:bg-white/[0.04]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
                  <ProjectVisual variant={p.visual} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
