import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/effects/Reveal";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function FeaturedWork() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <section
      aria-labelledby="work-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Premium products,{" "}
                <span className="gradient-text">shipped end-to-end</span>
              </>
            }
            description="A glimpse at how we partner with founders, operators and product teams — from architecture to launch."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className={cn(i === 0 ? "lg:col-span-2" : "")}
            >
              <Link
                href={`/portfolio#${p.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-black/[0.06] bg-white/60 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-elevation-3 dark:border-white/[0.06] dark:bg-ink-900/60"
              >
                <div className="grid gap-6 p-6 md:grid-cols-12 md:p-8">
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      {p.category}
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/[0.06] bg-white/80 px-2.5 py-1 text-[11px] font-medium text-foreground/80 dark:border-white/[0.06] dark:bg-white/[0.04]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
                      Read case
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <ProjectVisual variant={p.visual} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-500"
          >
            Browse all projects
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Lightweight, stylized project mocks — pure SVG/CSS, no external images. */
export function ProjectVisual({ variant }: { variant: string }) {
  switch (variant) {
    case "fintech":
      return <FintechMock />;
    case "logistics":
      return <LogisticsMock />;
    case "healthcare":
      return <HealthcareMock />;
    case "ecommerce":
      return <EcommerceMock />;
    case "realestate":
      return <RealestateMock />;
    case "saas":
      return <SaasMock />;
    default:
      return <FintechMock />;
  }
}

function MockShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-br from-white to-white/60 p-4 shadow-elevation-2 dark:border-white/[0.06] dark:from-ink-900 dark:to-ink-950">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        </div>
        <div className="rounded-md border border-black/[0.06] bg-black/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted-foreground dark:border-white/[0.06] dark:bg-white/[0.04]">
          {label}
        </div>
        <div className="h-2 w-8" />
      </div>
      {children}
    </div>
  );
}

function FintechMock() {
  return (
    <MockShell label="orbit-fin.app">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 rounded-xl border border-black/[0.05] bg-white/80 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-medium">Portfolio · YTD</span>
            <span className="font-mono text-emerald-500">+18.7%</span>
          </div>
          <svg viewBox="0 0 240 80" className="mt-2 h-20 w-full">
            <defs>
              <linearGradient id="fg1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#29ABE2" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#29ABE2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 60 C 20 50, 40 55, 60 40 S 100 25, 130 30 S 180 10, 240 18 L 240 80 L 0 80 Z"
              fill="url(#fg1)"
            />
            <path
              d="M0 60 C 20 50, 40 55, 60 40 S 100 25, 130 30 S 180 10, 240 18"
              fill="none"
              stroke="#29ABE2"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="col-span-5 space-y-2">
          {["AAPL +1.4%", "MSFT +0.9%", "ETH -0.6%"].map((l) => (
            <div
              key={l}
              className="flex items-center justify-between rounded-lg border border-black/[0.05] bg-white/80 px-2 py-1.5 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              <span>{l.split(" ")[0]}</span>
              <span
                className={`font-mono ${l.includes("-") ? "text-red-500" : "text-emerald-500"}`}
              >
                {l.split(" ")[1]}
              </span>
            </div>
          ))}
        </div>
        <div className="col-span-12 grid grid-cols-3 gap-2">
          {[
            { l: "AUM", v: "$2.4B" },
            { l: "Active", v: "47k" },
            { l: "P95", v: "84ms" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-lg border border-black/[0.05] bg-white/80 p-2 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              <div className="uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
              <div className="font-display text-sm font-semibold">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function LogisticsMock() {
  return (
    <MockShell label="atlas-logistics.io">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8 rounded-xl border border-black/[0.05] bg-white/80 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <svg viewBox="0 0 240 100" className="h-24 w-full">
            <rect width="240" height="100" fill="none" />
            {/* world-style dots */}
            {Array.from({ length: 40 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 17) % 240}
                cy={((i * 31) % 80) + 8}
                r="1.2"
                className="fill-foreground/15"
              />
            ))}
            <path
              d="M30 70 Q 90 10, 150 50 T 220 30"
              fill="none"
              stroke="#29ABE2"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx="30" cy="70" r="3" fill="#29ABE2" />
            <circle cx="220" cy="30" r="3" fill="#29ABE2" />
          </svg>
        </div>
        <div className="col-span-4 space-y-2">
          {["ETA 12:42", "On time", "3 stops"].map((l) => (
            <div
              key={l}
              className="rounded-lg border border-black/[0.05] bg-white/80 px-2 py-1.5 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              {l}
            </div>
          ))}
        </div>
        <div className="col-span-12 space-y-1">
          {["Container · MSCU 4928310", "Vessel · Cosco Boston"].map((l) => (
            <div
              key={l}
              className="flex items-center justify-between rounded-lg border border-black/[0.05] bg-white/80 px-2 py-1.5 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              <span>{l}</span>
              <span className="font-mono text-brand-500">tracking</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function HealthcareMock() {
  return (
    <MockShell label="clinique.care">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 rounded-xl border border-black/[0.05] bg-white/80 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="text-[10px] font-medium">Heart rate · 24h</div>
          <svg viewBox="0 0 240 60" className="mt-2 h-14 w-full">
            <path
              d="M0 30 L 30 30 L 40 10 L 50 50 L 60 30 L 90 30 L 100 14 L 110 46 L 120 30 L 240 30"
              fill="none"
              stroke="#29ABE2"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="col-span-5 space-y-2">
          {[
            { l: "BPM", v: "68" },
            { l: "SpO₂", v: "98%" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-lg border border-black/[0.05] bg-white/80 p-2 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              <div className="uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
              <div className="font-display text-sm font-semibold">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="col-span-12 space-y-1">
          {["Appointment · Dr. Aly · 10:30", "Lab results ready"].map((l) => (
            <div
              key={l}
              className="rounded-lg border border-black/[0.05] bg-white/80 px-2 py-1.5 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function EcommerceMock() {
  return (
    <MockShell label="store.phi">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-black/[0.05] bg-white/80 p-2 dark:border-white/[0.06] dark:bg-white/[0.03]"
          >
            <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-brand-500/30 to-brand-500/0" />
            <div className="mt-2 h-1.5 w-3/4 rounded bg-foreground/10" />
            <div className="mt-1 h-1.5 w-1/2 rounded bg-foreground/10" />
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function RealestateMock() {
  return (
    <MockShell label="properties.phi">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 rounded-xl border border-black/[0.05] bg-gradient-to-br from-brand-500/20 to-brand-500/0 p-3 dark:border-white/[0.06]">
          <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-br from-brand-500/40 to-brand-500/0" />
          <div className="mt-2 text-[10px] font-medium">2BR · Le Marais</div>
        </div>
        <div className="col-span-5 space-y-2">
          {["€1.2M", "92 m²", "Floor 4"].map((l) => (
            <div
              key={l}
              className="rounded-lg border border-black/[0.05] bg-white/80 px-2 py-1.5 text-[10px] dark:border-white/[0.06] dark:bg-white/[0.03]"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function SaasMock() {
  return (
    <MockShell label="admin.saas.phi">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3 space-y-1">
          {["Dashboard", "Customers", "Billing", "Settings"].map((l, i) => (
            <div
              key={l}
              className={`rounded-md px-2 py-1.5 text-[10px] ${
                i === 0
                  ? "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                  : "text-muted-foreground"
              }`}
            >
              {l}
            </div>
          ))}
        </div>
        <div className="col-span-9 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "MRR", v: "$84k" },
              { l: "Churn", v: "1.2%" },
              { l: "NPS", v: "62" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-md border border-black/[0.05] bg-white/80 p-2 dark:border-white/[0.06] dark:bg-white/[0.03]"
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
                <div className="font-display text-sm font-semibold">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-black/[0.05] bg-white/80 p-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
            <svg viewBox="0 0 200 50" className="h-12 w-full">
              {Array.from({ length: 14 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 14}
                  y={50 - (10 + ((i * 7) % 30))}
                  width="8"
                  height={10 + ((i * 7) % 30)}
                  className="fill-brand-500/70"
                  rx="1"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </MockShell>
  );
}
