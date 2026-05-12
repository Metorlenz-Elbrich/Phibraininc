import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  Target,
  Wrench,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/Reveal";
import { GridBackground } from "@/components/effects/GridBackground";
import { ProjectVisual } from "@/components/sections/FeaturedWork";
import CTASection from "@/components/sections/CTASection";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Case study" };
  return {
    title: `${project.shortTitle} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${siteConfig.name}`,
      description: project.summary,
      url: absoluteUrl(`/portfolio/${project.slug}`),
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-16">
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
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All case studies
            </Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Badge variant="default" className="uppercase tracking-[0.18em]">
                  {project.category} · {project.year}
                </Badge>
                <h1 className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
                  {project.summary}
                </p>
                <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    <dt className="sr-only">Duration</dt>
                    <dd>
                      <span className="text-foreground/80">{project.duration}</span>
                    </dd>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <dt className="sr-only">Sector</dt>
                    <dd className="text-foreground/80">{project.category}</dd>
                  </div>
                </dl>
              </div>
              <div className="lg:col-span-5">
                <ProjectVisual variant={project.visual} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="relative py-10">
        <div className="container">
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
              {project.outcomes.map((o) => (
                <div
                  key={o.label}
                  className="bg-background p-7"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                    {o.label}
                  </div>
                  <div className="mt-3 font-display text-3xl font-semibold tracking-tight gradient-text">
                    {o.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* NARRATIVE */}
      <section className="relative py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
              {project.description.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGE + SOLUTION */}
      <section className="relative py-10">
        <div className="container grid gap-6 md:grid-cols-2">
          <Reveal>
            <Block
              icon={<Target className="h-5 w-5" aria-hidden="true" />}
              eyebrow="The challenge"
              title="What we were asked to fix"
              body={project.challenge}
            />
          </Reveal>
          <Reveal delay={0.06}>
            <Block
              icon={<Wrench className="h-5 w-5" aria-hidden="true" />}
              eyebrow="Our solution"
              title="How we delivered"
              body={project.solution}
            />
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURE + SECURITY */}
      <section className="relative py-16 md:py-20">
        <div className="container grid gap-6 md:grid-cols-2">
          <Reveal>
            <ListBlock
              icon={<Layers className="h-5 w-5" aria-hidden="true" />}
              eyebrow="Architecture"
              title="System highlights"
              items={project.architecture}
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ListBlock
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
              eyebrow="Security"
              title="Hardening & compliance"
              items={project.security}
            />
          </Reveal>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative py-10">
        <div className="container">
          <Reveal>
            <div className="rounded-3xl border border-black/[0.06] bg-white/60 p-8 backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-900/60">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Technology stack
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-black/[0.06] bg-white/80 px-3 py-1.5 text-xs font-medium text-foreground/80 dark:border-white/[0.06] dark:bg-white/[0.04]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MORE PROJECTS */}
      <section className="relative py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                More case studies
              </h2>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-500"
              >
                View all
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-elevation-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.06] dark:bg-ink-900/60"
                >
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {p.category}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                    {p.shortTitle}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
                    Read case
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Block({
  icon,
  eyebrow,
  title,
  body,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="h-full rounded-3xl border border-black/[0.06] bg-white/70 p-8 backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-900/60">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
        {icon}
      </div>
      <div className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function ListBlock({
  icon,
  eyebrow,
  title,
  items,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="h-full rounded-3xl border border-black/[0.06] bg-white/70 p-8 backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-900/60">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
        {icon}
      </div>
      <div className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
