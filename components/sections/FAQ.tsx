"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";

const faqs = [
  {
    q: "How does an engagement with PhiBrain start?",
    a: "We start with a free 30-minute discovery call to understand your context, constraints and goals. From there we propose a phased plan with clear deliverables, a transparent budget and explicit success metrics.",
  },
  {
    q: "Can you work with our existing engineering team?",
    a: "Yes — we frequently embed within in-house teams. We adapt to your code review process, sprint cadence and architectural decisions. Knowledge transfer is part of every engagement, not an afterthought.",
  },
  {
    q: "What does pricing look like?",
    a: "Pricing depends on scope, but most projects start at a fixed-price discovery phase, then convert to a monthly retainer or a milestone-based contract. We avoid hourly billing — it punishes efficiency.",
  },
  {
    q: "Do you handle hosting, deployment and maintenance?",
    a: "We can. We deploy on Vercel, AWS or your existing cloud, and offer ongoing maintenance retainers covering security patching, performance, monitoring and feature delivery.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "Security is part of every phase. We follow OWASP Top 10 secure development principles, enforce strong HTTP headers, validate inputs server-side, and audit dependencies. For regulated industries we align with GDPR, HIPAA or SOC 2 controls.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Of course. We sign mutual NDAs before any commercially sensitive discussion. Just ask.",
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
                Answers to common{" "}
                <span className="gradient-text">questions</span>
              </>
            }
            description="If you have something we haven't covered here, the contact page is the fastest way to reach us."
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
