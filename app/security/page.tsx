import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security statement",
  description:
    "How PhiBrain engineers, hardens and operates the systems we build — including this website.",
  alternates: { canonical: "/security" },
};

const sections = [
  {
    id: "principles",
    heading: "Principles",
    body: (
      <>
        <p>
          We treat security as a first-class engineering deliverable, not a
          checkbox at the end of a project. Every product we build follows the
          same baseline:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Threat-modelling during discovery, before a line of code is written.</li>
          <li>Secure-by-default architecture aligned with OWASP Top 10 principles.</li>
          <li>Hardened HTTP headers, validated inputs, and least-privilege access.</li>
          <li>Continuous dependency scanning and patching in CI/CD.</li>
          <li>Dedicated security-review phase before every go-live.</li>
        </ul>
      </>
    ),
  },
  {
    id: "this-site",
    heading: "How this site is hardened",
    body: (
      <>
        <p>
          The protections you can observe by inspecting{" "}
          <code className="rounded bg-black/[0.04] px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06]">
            {siteConfig.url}
          </code>{" "}
          include:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Strict, nonce-based Content-Security-Policy</strong> generated per-request in edge middleware.</li>
          <li><strong>HSTS preload</strong>, <strong>X-Frame-Options: DENY</strong>, <strong>X-Content-Type-Options: nosniff</strong>, <strong>Referrer-Policy</strong>, <strong>Permissions-Policy</strong>.</li>
          <li><strong>CSRF protection</strong> on the contact endpoint via a double-submit cookie pattern with constant-time comparison.</li>
          <li><strong>Layered rate-limiting</strong> on the contact API: per-IP and per-IP+UA fingerprint buckets.</li>
          <li><strong>Server-side input validation</strong> with Zod, including length bounds, character allowlists and trimmed normalisation.</li>
          <li><strong>Honeypot + time-on-page heuristics</strong> against scripted submissions.</li>
          <li><strong>No third-party trackers</strong> — no advertising cookies, no cross-site fingerprinting.</li>
        </ul>
      </>
    ),
  },
  {
    id: "operations",
    heading: "Operations",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>Source code in a private repository with mandatory code review and signed commits.</li>
        <li>Secrets stored in managed vaults; never committed to source control.</li>
        <li>Production deploys are reproducible and rollback-safe.</li>
        <li>Access to production limited to named engineers, audited monthly.</li>
      </ul>
    ),
  },
  {
    id: "responsible-disclosure",
    heading: "Responsible disclosure",
    body: (
      <>
        <p>
          We welcome reports of security issues. If you believe you&apos;ve
          found a vulnerability in our website or in a product we&apos;ve
          built, please email{" "}
          <Link
            href={`mailto:${siteConfig.contactEmail}?subject=Security%20disclosure`}
            className="text-brand-500 underline-offset-4 hover:underline"
          >
            {siteConfig.contactEmail}
          </Link>{" "}
          with the subject &quot;Security disclosure&quot;.
        </p>
        <p>We commit to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Acknowledging your report within 2 business days.</li>
          <li>Providing a triage update within 5 business days.</li>
          <li>Crediting researchers who request it, once the issue is fixed.</li>
          <li>Not pursuing legal action against good-faith research that follows this policy.</li>
        </ul>
      </>
    ),
  },
  {
    id: "client-engagements",
    heading: "Client engagements",
    body: (
      <p>
        For client work, security expectations and compliance requirements
        (GDPR, HIPAA, SOC 2, ISO 27001 alignment, …) are captured upfront in
        the engagement contract and revisited during the dedicated security
        review phase before go-live.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Security statement"
      title={
        <>
          <span className="gradient-text-soft">Security as a</span>{" "}
          <span className="gradient-text">first-class deliverable.</span>
        </>
      }
      lede="A summary of how we engineer, harden and operate the systems we build — including this website."
      lastUpdated="May 2026"
      sections={sections}
    />
  );
}
