"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock scroll when open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 text-foreground backdrop-blur-md transition-colors hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] lg:hidden"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative mx-4 mt-4 overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/95 p-6 shadow-elevation-4"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {siteConfig.navigation.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-display font-medium transition-colors",
                          active
                            ? "bg-white/[0.06] text-white"
                            : "text-white/80 hover:bg-white/[0.04] hover:text-white",
                        )}
                      >
                        {item.label}
                        <ArrowUpRight
                          className="h-5 w-5 opacity-50"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Button
                asChild
                variant="primary"
                size="lg"
                className="mt-6 w-full"
              >
                <Link href={siteConfig.primaryCta.href}>
                  {siteConfig.primaryCta.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
