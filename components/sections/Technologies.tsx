import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const groups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Radix UI"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Expo", "Swift", "Kotlin"],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "Bun", "GraphQL", "REST", "tRPC", "Python"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "Prisma", "Drizzle", "Redis", "Elasticsearch"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Vercel", "AWS", "Cloudflare", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    title: "Quality",
    items: ["Playwright", "Vitest", "Lighthouse", "Sentry", "OpenTelemetry"],
  },
];

export default function Technologies() {
  return (
    <section
      aria-labelledby="tech-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Stack"
            title={
              <>
                The technologies behind{" "}
                <span className="gradient-text">our craft</span>
              </>
            }
            description="We pick mature, well-supported, type-safe tools — and we use them with depth rather than spreading thin across trendy frameworks."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white/60 p-6 backdrop-blur-md transition-colors hover:border-brand-500/30 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {g.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-black/[0.06] bg-white/80 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors group-hover:border-brand-500/20 group-hover:bg-brand-500/[0.06] dark:border-white/[0.06] dark:bg-white/[0.04]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
