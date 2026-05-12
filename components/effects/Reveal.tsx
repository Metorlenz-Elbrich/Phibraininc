"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/** Reveal-on-scroll wrapper — fades + slides children into view once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0 },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{
        duration: reduce ? 0 : 0.7,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
