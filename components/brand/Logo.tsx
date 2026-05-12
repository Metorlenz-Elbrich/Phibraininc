import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
  withLink?: boolean;
  ariaLabel?: string;
};

/**
 * Official PhiBrain brand mark.
 * - `full` renders the wordmark + brain illustration (navbar, footer).
 * - `mark` renders only the stylized brain glyph (favicons, badges).
 */
export default function Logo({
  variant = "full",
  className,
  withLink = true,
  ariaLabel = "PhiBrain — Home",
}: LogoProps) {
  const src = variant === "full" ? "/phibrain-logo.svg" : "/phibrain-mark.svg";
  const dimensions =
    variant === "full"
      ? { width: 180, height: 44 }
      : { width: 40, height: 40 };

  const img = (
    <Image
      src={src}
      alt="PhiBrain"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className={cn(
        "select-none",
        variant === "full" ? "h-9 w-auto" : "h-9 w-9",
      )}
    />
  );

  if (!withLink) return <span className={cn("inline-flex", className)}>{img}</span>;

  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {img}
    </Link>
  );
}
