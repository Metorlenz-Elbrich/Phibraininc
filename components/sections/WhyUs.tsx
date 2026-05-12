import {
  ShieldCheck,
  Zap,
  Layers,
  HeartHandshake,
  Lock,
  LineChart,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const reasons = [
  {
    Icon: ShieldCheck,
    title: "Secure by default",
    description:
      "OWASP-aligned architecture, hardened HTTP headers, validated inputs and zero-trust API design from day one.",
  },
  {
    Icon: Zap,
    title: "Engineered for performance",
    description:
      "Core Web Vitals as a first-class deliverable. Bundle discipline, image optimization, edge caching, smooth UI.",
  },
  {
    Icon: Layers,
    title: "Composable architecture",
    description:
      "Typed, modular, framework-agnostic — every system we ship can be extended by your in-house team without rewrites.",
  },
  {
    Icon: HeartHandshake,
    title: "Senior partnership",
    description:
      "You work directly with the people writing the code — no layered agencies, no junior hand-offs.",
  },
  {
    Icon: Lock,
    title: "Privacy & compliance",
    description:
      "GDPR-ready data flows, consent-aware analytics, encryption-at-rest and clear data retention guarantees.",
  },
  {
    Icon: LineChart,
    title: "Outcome-driven",
    description:
      "We measure conversion, retention and engineering velocity — not lines of code or feature counts.",
  },
];

export default function WhyUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Why PhiBrain"
            title={
              <>
                Built like a product team,{" "}
                <span className="gradient-text">priced like a studio</span>
              </>
            }
            description="Six principles guide every line of code and every pixel we ship — they're how we earn the right to call ourselves your partner."
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/[0.06] bg-black/[0.06] md:grid-cols-2 lg:grid-cols-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
          {reasons.map(({ Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.04}>
              <div className="group relative h-full bg-background p-8 transition-colors hover:bg-brand-500/[0.025]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500 transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
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
  );
}
