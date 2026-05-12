"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/effects/GridBackground";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";

const stats = [
  { value: "12+", label: "products shipped" },
  { value: "98%", label: "client retention" },
  { value: "<24h", label: "response time" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      <GridBackground fade="radial" />
      <NoiseOverlay />

      {/* Ambient gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(41,171,226,0.30), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(103,194,233,0.20), transparent 70%)",
        }}
      />

      <div className="container">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="default" className="gap-1.5 uppercase tracking-[0.18em]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Product engineering studio
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance"
          >
            <span className="gradient-text-soft">Software that moves your</span>
            <br />
            <span className="gradient-text">business forward.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            PhiBrain partners with ambitious teams to design and engineer
            beautiful web and mobile products, scalable APIs and secure cloud
            platforms — from first sketch to production launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button asChild size="xl">
              <Link href="/contact">
                Start a project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/portfolio">See our work</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.4 }}
            className="mt-12 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <ShieldCheck className="h-4 w-4 text-brand-500" aria-hidden="true" />
            Secure-by-default · GDPR-ready · OWASP-aligned
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <HeroVisual />
        </motion.div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-black/[0.06] bg-white/40 px-4 py-5 backdrop-blur-md dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function HeroVisual() {
  return (
    <div className="relative">
      {/* glowing border */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-3xl opacity-60 conic-border blur-md"
      />
      <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white/80 shadow-elevation-4 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-ink-950/80">
        {/* mock chrome */}
        <div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-3 dark:border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="rounded-md border border-black/[0.06] bg-black/[0.03] px-3 py-1 text-[11px] font-mono text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]">
            app.phibrain.com / studio
          </div>
          <div className="h-2.5 w-12" />
        </div>

        {/* dashboard mock */}
        <div className="grid grid-cols-12 gap-4 p-6">
          {/* sidebar */}
          <div className="col-span-3 hidden flex-col gap-2 md:flex">
            {["Overview", "Projects", "Velocity", "Quality", "Releases"].map(
              (l, i) => (
                <div
                  key={l}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                    i === 0
                      ? "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  {l}
                </div>
              ),
            )}
          </div>

          {/* main */}
          <div className="col-span-12 md:col-span-9 space-y-4">
            {/* hero stat */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "MRR", value: "$184k" },
                { label: "Active users", value: "12,847" },
                { label: "P95 latency", value: "112ms" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-black/[0.05] bg-white/60 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]"
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold tracking-tight">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* chart */}
            <div className="rounded-xl border border-black/[0.05] bg-white/60 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-medium">Engagement · last 30 days</span>
                <span className="font-mono text-brand-500">+24.3%</span>
              </div>
              <svg viewBox="0 0 400 120" className="h-28 w-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#29ABE2" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#29ABE2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 90 C 30 70, 60 80, 90 60 S 150 40, 180 50 S 240 30, 270 40 S 330 10, 400 20 L 400 120 L 0 120 Z"
                  fill="url(#g1)"
                />
                <path
                  d="M0 90 C 30 70, 60 80, 90 60 S 150 40, 180 50 S 240 30, 270 40 S 330 10, 400 20"
                  fill="none"
                  stroke="#29ABE2"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* list */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                "Pipeline deploy · main → prod",
                "Lighthouse · 99 / 100 / 100 / 100",
                "Bundle · 142kb (gzip)",
                "Tests · 482 passing",
              ].map((l) => (
                <div
                  key={l}
                  className="flex items-center justify-between rounded-lg border border-black/[0.05] bg-white/60 px-3 py-2 text-xs dark:border-white/[0.06] dark:bg-white/[0.03]"
                >
                  <span className="text-foreground/80">{l}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
