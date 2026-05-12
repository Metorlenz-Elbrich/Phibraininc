import {
  Compass,
  Lightbulb,
  LayoutGrid,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  Activity,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const steps = [
  {
    Icon: Compass,
    step: "01",
    title: "Discovery",
    description:
      "We map your business goals, users, constraints and existing systems. Output: a sharp brief, success metrics and a risk-aware delivery plan.",
  },
  {
    Icon: Lightbulb,
    step: "02",
    title: "Product strategy",
    description:
      "We translate intent into a prioritized roadmap. What ships first, what gets cut, what gets measured — agreed upfront, written down.",
  },
  {
    Icon: LayoutGrid,
    step: "03",
    title: "Architecture",
    description:
      "We design systems for the long run: typed contracts, scalable data models, observability hooks and clean integration boundaries.",
  },
  {
    Icon: PenTool,
    step: "04",
    title: "Design",
    description:
      "Information architecture, prototypes and a design system tuned to your brand — built collaboratively, validated with users early.",
  },
  {
    Icon: Code2,
    step: "05",
    title: "Development",
    description:
      "Typed, tested code shipped continuously to staging. You see progress in pull requests, not slides — every week, with a working build.",
  },
  {
    Icon: ShieldCheck,
    step: "06",
    title: "Security review",
    description:
      "OWASP-aligned threat modelling, dependency audits, hardened headers, secret scanning and a pen-test ready posture before any go-live.",
  },
  {
    Icon: Rocket,
    step: "07",
    title: "Deployment",
    description:
      "Performance, accessibility and SLO audits before launch. We own the rollout playbook so your team owns the announcement.",
  },
  {
    Icon: Activity,
    step: "08",
    title: "Maintenance",
    description:
      "Ongoing iteration informed by analytics, user feedback, engineering health and security signals. We stay your long-term partner.",
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
            eyebrow="Engineering process"
            title={
              <>
                Eight repeatable phases from idea to{" "}
                <span className="gradient-text">measurable impact</span>
              </>
            }
            description="No surprises. Each phase has explicit deliverables, decision points and quality gates — including a dedicated security review before go-live."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-2 lg:grid-cols-4 dark:border-white/[0.06] dark:bg-white/[0.04]">
          {steps.map(({ Icon, step, title, description }, i) => (
            <Reveal key={step} delay={i * 0.05} as="li">
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
