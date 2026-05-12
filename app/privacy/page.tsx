import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How PhiBrain collects, uses, stores and protects personal data — written in plain language, GDPR-aligned.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    id: "scope",
    heading: "Scope",
    body: (
      <>
        <p>
          This policy describes how {siteConfig.legalName} (&quot;PhiBrain&quot;,
          &quot;we&quot;, &quot;us&quot;) collects and processes personal data
          when you visit {siteConfig.url}, send us a message or engage us for
          professional services.
        </p>
        <p>
          We act as the <strong>data controller</strong> for any personal data
          you share with us through this website. For data you process inside
          products we build for you, your organisation is the controller and we
          act as a processor under a separate Data Processing Agreement.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <>
        <p>We collect only what we need to respond and operate the site:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Contact form submissions</strong> — name, email, optional
            company / phone, project qualification fields and your message.
          </li>
          <li>
            <strong>Direct emails</strong> — anything you send to {siteConfig.contactEmail}.
          </li>
          <li>
            <strong>Technical logs</strong> — IP address, user agent and
            timestamps, retained briefly to detect abuse.
          </li>
        </ul>
        <p>
          We do not run third-party advertising trackers, fingerprinting scripts
          or cross-site identifiers.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    heading: "Why we process it",
    body: (
      <>
        <p>
          We process your data only for the following purposes, each with a
          documented lawful basis under the GDPR:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Responding to your enquiry and pre-contract negotiations
            (<em>Art. 6 1.b — contract</em>).
          </li>
          <li>
            Operating, securing and improving the website
            (<em>Art. 6 1.f — legitimate interest</em>).
          </li>
          <li>
            Complying with applicable legal obligations
            (<em>Art. 6 1.c</em>).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Contact form submissions and email exchanges are kept for up to
          24 months after our last interaction, then deleted. Anonymous
          aggregated metrics may be kept longer.
        </p>
        <p>
          Technical security logs are kept for up to 30 days.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We never sell your data. We share it only with vetted sub-processors
          strictly required to operate the site:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Vercel</strong> — hosting and edge delivery.</li>
          <li><strong>Email provider</strong> — transactional notifications.</li>
        </ul>
        <p>
          A current list of sub-processors and their locations is available on
          request.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          You can exercise any GDPR right (access, rectification, deletion,
          restriction, portability, objection) by emailing{" "}
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-brand-500 underline-offset-4 hover:underline"
          >
            {siteConfig.contactEmail}
          </Link>
          . We aim to respond within 30 days.
        </p>
        <p>
          You also have the right to lodge a complaint with your local data
          protection authority.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <>
        <p>
          The website enforces HTTPS everywhere, applies a strict
          Content-Security-Policy, rate-limits its contact endpoint and uses
          CSRF protection. See the{" "}
          <Link
            href="/security"
            className="text-brand-500 underline-offset-4 hover:underline"
          >
            security statement
          </Link>{" "}
          for the full posture.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We update this policy whenever our practices change. Material changes
        will be announced on this page with a refreshed &quot;Last updated&quot;
        date.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      title={
        <>
          <span className="gradient-text-soft">How we handle</span>{" "}
          <span className="gradient-text">your data.</span>
        </>
      }
      lede="In plain language: what we collect, why we collect it, how long we keep it and how to make us delete it."
      lastUpdated="May 2026"
      sections={sections}
    />
  );
}
