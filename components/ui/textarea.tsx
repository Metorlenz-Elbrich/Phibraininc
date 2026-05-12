import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[140px] w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm",
        "shadow-elevation-1 transition-all placeholder:text-muted-foreground resize-y",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500",
        "dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
