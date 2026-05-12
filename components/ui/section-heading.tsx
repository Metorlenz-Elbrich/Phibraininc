import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Badge variant="default" className="uppercase tracking-[0.18em]">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="font-display text-display-lg font-semibold tracking-tight gradient-text-soft text-balance">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
