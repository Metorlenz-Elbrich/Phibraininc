import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const testimonials = [
  {
    quote:
      "PhiBrain didn't just rebuild our product — they reshaped how our team thinks about quality. The new platform ships fewer regressions in a quarter than we used to ship in a week.",
    name: "Camille Réaux",
    role: "VP Engineering, Orbit Capital",
  },
  {
    quote:
      "The level of design polish surprised our entire executive team. The first board demo got a standing ovation. We've never had that with a vendor.",
    name: "Mathéo Bricot",
    role: "Chief Product Officer, Atlas Logistics",
  },
  {
    quote:
      "What I appreciated most was how seriously they took security. Hardened headers, validation, audit logs — all explained and shipped without us having to push for it.",
    name: "Dr. Sarah Linnea",
    role: "CTO, Clinique Health",
  },
  {
    quote:
      "They moved twice as fast as the agency we replaced and the code base is half the size. Our internal devs were able to extend it confidently from day one.",
    name: "Jordan Petit",
    role: "Founder, Vela Atelier",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title={
              <>
                Trusted by founders and{" "}
                <span className="gradient-text">enterprise teams</span>
              </>
            }
            description="A small sample of what our partners say after working with us."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 p-8 backdrop-blur-xl transition-shadow hover:shadow-elevation-3 dark:border-white/[0.06] dark:bg-ink-900/60">
                <Quote
                  className="absolute -right-3 -top-3 h-24 w-24 text-brand-500/10 transition-colors group-hover:text-brand-500/20"
                  aria-hidden="true"
                />
                <blockquote className="relative font-display text-lg leading-relaxed text-foreground/90 text-pretty">
                  “{t.quote}”
                </blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 font-display text-sm font-semibold text-brand-700 dark:text-brand-300"
                  >
                    {t.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
