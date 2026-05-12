import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, ShieldCheck, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/Reveal";
import { GridBackground } from "@/components/effects/GridBackground";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. We respond within one business day to every serious enquiry.",
  alternates: { canonical: "/contact" },
};

const guarantees = [
  { Icon: Clock, label: "Reply within 24h" },
  { Icon: ShieldCheck, label: "NDA on request" },
  { Icon: Lock, label: "Encrypted in transit" },
];

const socials = [
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24">
      <GridBackground fade="radial" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(41,171,226,0.25), transparent 70%)",
        }}
      />

      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="uppercase tracking-[0.18em]">
              Contact
            </Badge>
            <h1 className="mt-6 font-display text-display-xl font-semibold tracking-tight text-balance">
              <span className="gradient-text-soft">Let&apos;s build something</span>{" "}
              <span className="gradient-text">worth shipping.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Tell us about your project below — or email us directly. Every
              serious enquiry gets a thoughtful response within one business day.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white/70 p-6 backdrop-blur-xl md:p-10 dark:border-white/[0.06] dark:bg-ink-900/60">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal className="space-y-6 lg:col-span-5" delay={0.1}>
            {/* Direct contact */}
            <div className="rounded-3xl border border-black/[0.06] bg-white/70 p-8 backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-900/60">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Reach us directly
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer email or social? Pick a channel — we monitor all of them.
              </p>
              <Link
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-500/15 dark:text-brand-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contactEmail}
              </Link>
              <ul className="mt-6 flex items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 text-foreground/70 transition-colors hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-500 dark:border-white/[0.08] dark:bg-white/[0.03]"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <ul className="grid gap-3">
              {guarantees.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/40 px-5 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-500">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Your data is processed solely to respond to your enquiry — read
              the full{" "}
              <Link
                href="/privacy"
                className="text-foreground underline-offset-4 hover:underline"
              >
                privacy policy
              </Link>
              . You can request deletion at any time by emailing{" "}
              <Link
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.contactEmail}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
