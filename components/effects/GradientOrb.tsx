import { cn } from "@/lib/utils";

type GradientOrbProps = {
  className?: string;
  tone?: "brand" | "violet" | "neutral";
};

/** Soft animated gradient orb — used as ambient background lighting. */
export function GradientOrb({ className, tone = "brand" }: GradientOrbProps) {
  const palette =
    tone === "brand"
      ? "from-brand-500/40 via-brand-400/15 to-transparent"
      : tone === "violet"
        ? "from-violet-500/30 via-fuchsia-400/15 to-transparent"
        : "from-white/20 via-white/5 to-transparent";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-[40rem] w-[40rem] rounded-full blur-3xl",
        "bg-gradient-radial",
        "animate-pulse-glow",
        className,
      )}
      style={{
        background: `radial-gradient(closest-side, ${tone === "brand" ? "rgba(41,171,226,0.35)" : tone === "violet" ? "rgba(167,139,250,0.30)" : "rgba(255,255,255,0.18)"}, transparent 70%)`,
      }}
      data-tone={palette}
    />
  );
}
