import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Which cookies and similar technologies we use, why, and how to control them.",
  alternates: { canonical: "/cookies" },
};

const sections = [
  {
    id: "what-are-cookies",
    heading: "What cookies are",
    body: (
      <p>
        Cookies are small text files set on your device when you visit a
        website. They allow the site to remember preferences, secure your
        session and measure performance. This page lists the cookies we use
        and why.
      </p>
    ),
  },
  {
    id: "essential",
    heading: "Strictly necessary cookies",
    body: (
      <>
        <p>
          These are required for the site to function and cannot be disabled
          without breaking core features.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-black/[0.06] dark:border-white/[0.06]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/40 dark:bg-white/[0.04]">
              <tr>
                <th className="px-4 py-3 font-medium">Cookie</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/[0.06] dark:border-white/[0.06]">
                <td className="px-4 py-3 font-mono text-xs">csrf-token</td>
                <td className="px-4 py-3">
                  Protects the contact form against cross-site request
                  forgery (CSRF) via the double-submit pattern.
                </td>
                <td className="px-4 py-3">8 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "analytics",
    heading: "Analytics cookies",
    body: (
      <p>
        We do not currently set analytics or advertising cookies. If we add
        privacy-respecting analytics (e.g. anonymous, EU-hosted) in the
        future, this page will be updated and a consent banner will appear
        before any non-essential cookies are placed.
      </p>
    ),
  },
  {
    id: "control",
    heading: "How to control cookies",
    body: (
      <p>
        Every modern browser lets you block or delete cookies. Doing so for
        our domain will disable the contact form. Browser-level settings,
        rather than a banner, are the cleanest way to enforce your
        preferences.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookie policy"
      title={
        <>
          <span className="gradient-text-soft">A short, honest</span>{" "}
          <span className="gradient-text">cookie policy.</span>
        </>
      }
      lede="We use the minimum number of cookies needed to keep the contact form secure. No advertising trackers, no third-party fingerprinting."
      lastUpdated="May 2026"
      sections={sections}
    />
  );
}
