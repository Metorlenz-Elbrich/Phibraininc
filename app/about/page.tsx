import type { Metadata } from "next";
import {
  Target,
  Eye,
  Sparkles,
  Code2,
  Lightbulb,
  Handshake,
  ShieldCheck,
  Microscope,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/Reveal";
import { GridBackground } from "@/components/effects/GridBackground";
import { SectionHeading } from "@/components/ui/section-heading";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "PhiBrain is a senior product engineering studio. We design and engineer beautiful, secure software with founders and enterprise teams.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    Icon: Code2,
    title: "Craft over output",
    description:
      "We measure quality by what survives a year in production, not by the number of features shipped in a sprint.",
  },
  {
    Icon: Lightbulb,
    title: "Curiosity, applied",
    description:
      "We stay close to the edge of the industry — but we use new tools only when they make your product more reliable, not because they're new.",
  },
  {
    Icon: Handshake,
    title: "Honest partnership",
    description:
      "We say no to scope we can't ship well, we surface bad news early, and we share what we've learned — even when it's uncomfortable.",
  },
  {
    Icon: ShieldCheck,
    title: "Security as a default",
    description:
      "Every product we build is hardened from day one. Threat-modelled, validated, monitored — never an afterthought before launch.",
  },
];

const methodology = [
  {
    Icon: Compass,
    title: "Strategy first",
    description:
      "Every engagement starts with the business goal. Tech follows strategy — not the other way around.",
  },
  {
    Icon: Microscope,
    title: "Measure twice, cut once",
    description:
      "We invest in discovery and architecture upfront, so the implementation phase delivers — not discovers.",
  },
  {
    Icon: Sparkles,
    title: "Design as a competitive edge",
    description:
      "Premium products win on details. Motion, micro-interactions, type, density — every pixel earns its place.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-24">
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
                About PhiBrain
              </Badge>
              <h1 className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance">
                <span className="gradient-text-soft">A studio built to ship</span>{" "}
                <span className="gradient-text">software that lasts.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                PhiBrain was founded on a simple idea — most software fails not
                because it&apos;s hard to build, but because it&apos;s built
                without taste, without rigor, or without ownership. We exist to
                fix that.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="relative py-16 md:py-20">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-balance">
              Our story
            </h2>
          </Reveal>
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground lg:col-span-7">
            <p>
              PhiBrain was started by a small team of engineers and designers
              who&apos;d seen, again and again, the same pattern: products
              launched with great intent but built on shaky foundations, slowed
              by technical debt within a year, and quietly abandoned within
              two.
            </p>
            <p>
              We started PhiBrain to be the studio we always wished we could
              hire — small enough to care, senior enough to ship, and
              structured enough to scale with our partners. No PMs handing off
              Figma to juniors. No layers of account managers. Just the people
              doing the work, talking to the people who&apos;ll use it.
            </p>
            <p>
              Today, we work with founders, operators and engineering teams
              across fintech, healthcare, logistics, e-commerce and SaaS — on
              both greenfield products and serious modernization programs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="relative py-16 md:py-20">
        <div className="container grid gap-6 md:grid-cols-2">
          {[
            {
              Icon: Target,
              eyebrow: "Mission",
              title: "Help ambitious teams ship the products they're proud of.",
              body: "We take the technical risk so our partners can focus on customers, growth and the business they're building.",
            },
            {
              Icon: Eye,
              eyebrow: "Vision",
              title: "Make premium product engineering accessible.",
              body: "World-class craft shouldn't be reserved for unicorns. We bring the same standards to early-stage teams and global enterprises.",
            },
          ].map((b, i) => (
            <Reveal key={b.eyebrow} delay={i * 0.08}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-black/[0.06] bg-white/70 p-8 backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-900/60">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl"
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
                  <b.Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {b.eyebrow}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="relative py-24 md:py-32">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title={
                <>
                  Four principles that shape{" "}
                  <span className="gradient-text">how we work</span>
                </>
              }
              description="These aren't posters on a wall — they're how we decide what to take on, what to push back on, and how to make trade-offs under pressure."
            />
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {values.map(({ Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-black/[0.06] bg-white/70 p-7 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-elevation-3 dark:border-white/[0.06] dark:bg-ink-900/60">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="relative py-24 md:py-32">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Methodology"
              title={
                <>
                  How we turn intent into{" "}
                  <span className="gradient-text">shipping software</span>
                </>
              }
              description="A pragmatic methodology — light on process, heavy on outcomes."
            />
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {methodology.map(({ Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-black/[0.06] bg-white/60 p-7 backdrop-blur-md dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <Icon
                    className="h-5 w-5 text-brand-500"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
