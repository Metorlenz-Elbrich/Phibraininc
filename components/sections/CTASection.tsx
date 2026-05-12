import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/effects/Reveal";

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/20 via-brand-500/5 to-transparent p-10 md:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
            />

            <div className="relative max-w-3xl">
              <h2
                id="cta-title"
                className="font-display text-display-lg font-semibold tracking-tight text-balance"
              >
                Got an idea worth building?{" "}
                <span className="gradient-text">Let&apos;s talk.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                We&apos;re selective about who we work with — and we take every
                conversation seriously. Tell us what you&apos;re building, and
                we&apos;ll respond within 24 hours.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button asChild size="xl">
                  <Link href="/contact">
                    Start a project
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="ghost">
                  <Link href="/portfolio">Browse our work</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
