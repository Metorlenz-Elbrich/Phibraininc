import { Reveal } from "@/components/effects/Reveal";

const partners = [
  "Orbit Capital",
  "Atlas Logistics",
  "Clinique Health",
  "Vela Atelier",
  "Domaine",
  "Lumen",
  "Northwind",
  "Modal",
];

export default function TrustBar() {
  return (
    <section
      aria-label="Trusted by"
      className="relative border-y border-black/[0.06] py-10 dark:border-white/[0.06]"
    >
      <div className="container">
        <Reveal>
          <p className="mb-6 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by founders, operators and engineering teams
          </p>
        </Reveal>
        <div className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
          />
          <div className="flex w-[200%] gap-12 animate-marquee">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="flex shrink-0 items-center gap-2 font-display text-base font-semibold tracking-tight text-foreground/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500/50" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
