"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between gap-6 rounded-full border px-4 py-2 transition-all duration-300",
            scrolled
              ? "border-black/[0.06] bg-white/80 shadow-elevation-2 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-ink-950/70"
              : "border-transparent bg-transparent",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
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
                      "relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-black/[0.05] dark:bg-white/[0.06]"
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href={siteConfig.primaryCta.href}>
                {siteConfig.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
