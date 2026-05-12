import { cn } from "@/lib/utils";

/** Subtle film-grain overlay — softens flat surfaces & gradients. */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay bg-noise",
        className,
      )}
    />
  );
}
