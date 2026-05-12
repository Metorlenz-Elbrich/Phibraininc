import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/Reveal";
import { GridBackground } from "@/components/effects/GridBackground";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack product engineering: web apps, mobile apps, UI/UX design, API engineering, cloud platforms, software modernization and ongoing support.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-20">
        <GridBackground fade="radial" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(41,171,226,0.25), transparent 70%)",
          }}
        />
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="default" className="uppercase tracking-[0.18em]">
                Services
              </Badge>
              <h1 className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance">
                <span className="gradient-text-soft">Engineering, design and</span>{" "}
                <span className="gradient-text">cloud — under one roof.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                Seven core capabilities, deeply intertwined. We engage where we
                add the most leverage — from a focused design sprint to a full
                product build with multi-year maintenance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesShowcase variant="full" />
      <Process />
      <Technologies />
      <CTASection />
    </>
  );
}
