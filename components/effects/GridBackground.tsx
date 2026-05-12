import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  className?: string;
  fade?: "radial" | "bottom" | "none";
  size?: number;
};

/**
 * Sub-grid background — used behind hero and section transitions.
 * Renders as a static SVG-style background via Tailwind utilities,
 * masked to fade gracefully into the surrounding surface.
 */
export function GridBackground({
  className,
  fade = "radial",
  size = 56,
}: GridBackgroundProps) {
  const mask =
    fade === "radial"
      ? "mask-radial-fade"
      : fade === "bottom"
        ? "mask-fade-bottom"
        : "";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-grid-light dark:bg-grid-dark",
        mask,
        className,
      )}
      style={{ backgroundSize: `${size}px ${size}px` }}
    />
  );
}
