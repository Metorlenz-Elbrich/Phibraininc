import Link from "next/link";
import { Github, Linkedin, Twitter, ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  {
    title: "Sitemap",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Secure web platforms", href: "/services#web" },
      { label: "Cross-platform mobile", href: "/services#mobile" },
      { label: "UI/UX product design", href: "/services#design" },
      { label: "Backend & API engineering", href: "/services#api" },
      { label: "Cloud integration", href: "/services#cloud" },
      { label: "Software modernization", href: "/services#modernization" },
      { label: "Maintenance & support", href: "/services#support" },
    ],
  },
  {
    title: "Case studies",
    links: [
      { label: "Orbit · Fintech", href: "/portfolio/orbit" },
      { label: "Atlas · Logistics", href: "/portfolio/atlas" },
      { label: "Clinique · Healthcare", href: "/portfolio/clinique" },
      { label: "Vela · Commerce", href: "/portfolio/vela" },
      { label: "Domaine · Real estate", href: "/portfolio/domaine" },
      { label: "Lumen · SaaS", href: "/portfolio/lumen" },
    ],
  },
];

const socials = [
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter / X" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-black/[0.06] dark:border-white/[0.06]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
      />
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand-500"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contactEmail}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/[0.06] px-3 py-1.5 text-xs font-medium text-brand-700 dark:text-brand-300">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Secure-by-design · OWASP-aligned
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8"
          >
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-brand-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid gap-6 border-t border-black/[0.06] pt-8 dark:border-white/[0.06] md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-muted-foreground">
              © {year} {siteConfig.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-xs">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex items-center gap-2 md:justify-end">
            {socials.map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 text-foreground/70 transition-colors hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-foreground/70"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
