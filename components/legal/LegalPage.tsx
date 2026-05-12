import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/effects/GridBackground";
import { Reveal } from "@/components/effects/Reveal";

export type LegalSection = {
  id: string;
  heading: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  lastUpdated: string;
  sections: LegalSection[];
};

/**
 * Premium-but-quiet template for legal pages (privacy, terms, cookies,
 * security). Provides:
 *   - Eyebrow + balanced display headline
 *   - "Last updated" line + sticky table of contents on lg+
 *   - Anchorable section ids
 *   - Tasteful prose typography matching the rest of the site
 */
export default function LegalPage({
  eyebrow,
  title,
  lede,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-12">
        <GridBackground fade="radial" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(41,171,226,0.22), transparent 70%)",
          }}
        />
        <div className="container">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to home
            </Link>
            <div className="mt-8 max-w-3xl">
              <Badge variant="default" className="uppercase tracking-[0.18em]">
                {eyebrow}
              </Badge>
              <h1 className="mt-6 font-display text-display-lg font-semibold tracking-tight text-balance">
                {title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
                {lede}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Last updated · {lastUpdated}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav
              aria-label="On this page"
              className="sticky top-28 hidden rounded-2xl border border-black/[0.06] bg-white/60 p-5 backdrop-blur-md lg:block dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-foreground/70 transition-colors hover:text-brand-500"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="prose prose-invert max-w-none space-y-12 lg:col-span-9">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-32"
                aria-labelledby={`${s.id}-heading`}
              >
                <h2
                  id={`${s.id}-heading`}
                  className="font-display text-2xl font-semibold tracking-tight md:text-3xl text-balance"
                >
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
