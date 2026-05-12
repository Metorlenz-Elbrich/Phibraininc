import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium",
    "transition-[transform,background,box-shadow,color] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-[1px]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white shadow-elevation-2 hover:bg-brand-400 hover:shadow-glow-brand",
        secondary:
          "bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-white/90",
        outline:
          "border border-black/10 bg-white/60 text-foreground backdrop-blur-md hover:bg-white/90 dark:border-white/15 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        ghost:
          "text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
        link: "text-brand-500 underline-offset-4 hover:underline rounded-md",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        xl: "h-14 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
