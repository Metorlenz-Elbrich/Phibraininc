import { Compass, PenTool, Code2, Rocket, Activity } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const steps = [
  {
    Icon: Compass,
    step: "01",
    title: "Discovery",
    description:
      "We map your business goals, users and constraints. Output: a sharp brief, success metrics, and a phased delivery plan.",
  },
  {
    Icon: PenTool,
    step: "02",
    title: "Design",
    description:
      "Information architecture, prototypes and a design system tuned to your brand — built collaboratively in Figma.",
  },
  {
    Icon: Code2,
    step: "03",
    title: "Engineering",
    description:
      "Typed, tested code shipped weekly. You see progress in staging, not slides. Pull requests, not promises.",
  },
  {
    Icon: Rocket,
    step: "04",
    title: "Launch",
    description:
      "Performance, accessibility and security audited before go-live. We handle the launch playbook, you handle the announcement.",
  },
  {
    Icon: Activity,
    step: "05",
    title: "Evolve",
    description:
      "Ongoing iteration informed by analytics, user feedback and engineering health metrics. We stay your partner.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title={
              <>
                A clear path from idea to{" "}
                <span className="gradient-text">measurable impact</span>
              </>
            }
            description="Five repeatable phases — each with concrete deliverables and decision points. No surprises, no slipped scope."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/[0.06] bg-black/[0.06] md:grid-cols-5 dark:border-white/[0.06] dark:bg-white/[0.04]">
          {steps.map(({ Icon, step, title, description }, i) => (
            <Reveal key={step} delay={i * 0.06} as="li">
              <div className="group relative h-full bg-background p-7 transition-colors hover:bg-brand-500/[0.025]">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-500 transition-transform group-hover:scale-105">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="font-display text-3xl font-semibold tracking-tight text-foreground/10">
                    {step}
                  </div>
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
        </ol>
      </div>
    </section>
  );
}
