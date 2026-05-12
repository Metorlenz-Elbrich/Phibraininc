"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const faqs = [
  {
    q: "What does pricing look like?",
    a: "Most engagements start with a fixed-price discovery phase to align on scope and deliverables, then convert to a milestone-based contract or a monthly retainer. We deliberately avoid hourly billing — it punishes efficiency. You'll always have a transparent, written budget before any implementation starts.",
  },
  {
    q: "What are typical timelines?",
    a: "Discovery sprints last one to three weeks. Production-grade MVPs ship in 8–16 weeks depending on complexity. Larger platforms are delivered as phased releases, with a working build in staging from week three.",
  },
  {
    q: "How does collaboration work day-to-day?",
    a: "You get a private Linear / Slack / Notion workspace, weekly progress demos and a single point of contact who is also writing code. We adapt to your sprint cadence and review process — there's no hand-off to junior or offshore teams.",
  },
  {
    q: "Who owns the source code, design files and infrastructure?",
    a: "You do. From day one. All repositories live in your GitHub organization, design files in your Figma workspace, and infrastructure in your cloud accounts. We never hold your assets hostage to keep you on retainer.",
  },
  {
    q: "Do you handle maintenance, hosting and deployment?",
    a: "Yes. We deploy on Vercel, AWS or your existing cloud, set up CI/CD, monitoring and alerting, and offer ongoing maintenance retainers covering security patching, performance, feature delivery and on-call response.",
  },
  {
    q: "How do you approach security and compliance?",
    a: "Security is a phase, not a checkbox. We follow OWASP Top 10 principles, enforce strong HTTP headers, validate inputs server-side, audit dependencies and run a dedicated security review before every go-live. For regulated industries we align with GDPR, HIPAA or SOC 2 controls.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Of course. We sign mutual NDAs before any commercially sensitive discussion — including this one. Just ask, and we'll send you our standard template (or sign yours).",
  },
  {
    q: "Can you work alongside our in-house engineering team?",
    a: "Yes — we frequently embed within in-house teams. We respect your architectural decisions and review process, and knowledge transfer is part of every engagement, not an afterthought before we leave.",
  },
  {
    q: "What stacks do you specialize in?",
    a: "Our core is Next.js, React, TypeScript, TailwindCSS, Node.js / Bun, PostgreSQL and modern cloud platforms (Vercel, AWS, GCP, Cloudflare). For mobile we use React Native + Expo. We pick boring, well-supported tools — and use them with depth.",
  },
  {
    q: "How fast will you respond to my first message?",
    a: "Within one business day. Every serious enquiry gets a thoughtful, human response — not a templated reply or a calendar link.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Answers to the questions{" "}
                <span className="gradient-text">that close deals</span>
              </>
            }
            description="If we haven't covered something below, the contact page is the fastest way to reach a senior engineer who can answer it."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
