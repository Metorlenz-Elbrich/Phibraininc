import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-brand-500/25 bg-brand-500/10 text-brand-700 dark:text-brand-300",
        muted:
          "border border-black/[0.06] bg-black/[0.03] text-ink-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-ink-300",
        outline:
          "border border-current/20 bg-transparent text-foreground",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
