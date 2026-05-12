import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that govern your use of the PhiBrain website and any services we provide.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    id: "agreement",
    heading: "The agreement",
    body: (
      <>
        <p>
          These Terms govern your use of {siteConfig.url} and any related
          services provided by {siteConfig.legalName}
          (&quot;PhiBrain&quot;). By accessing the site you agree to be bound
          by them.
        </p>
        <p>
          Engagement contracts, statements of work and master service
          agreements may add or override specific provisions for paying
          clients. In case of conflict, those documents prevail.
        </p>
      </>
    ),
  },
  {
    id: "use-of-site",
    heading: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Probe, scan or test the vulnerability of the site without prior written permission.</li>
          <li>Attempt to circumvent rate-limits, CSRF checks or other security controls.</li>
          <li>Submit content that is unlawful, defamatory or infringes third-party rights.</li>
          <li>Use automated means (scrapers, bots) other than well-behaved search-engine crawlers.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <>
        <p>
          All content on this site — text, code samples, design, logo, brand
          identity — is owned by {siteConfig.legalName} or its licensors and
          protected by applicable IP laws.
        </p>
        <p>
          Source code, designs and deliverables produced for a specific client
          engagement are governed by that engagement&apos;s contract. As a
          default, ownership transfers to the client on full payment.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    heading: "Disclaimer",
    body: (
      <p>
        The site is provided &quot;as is&quot;. We do our best to keep it
        secure, accurate and available, but we make no guarantees about
        uninterrupted access, fitness for any particular purpose or absence of
        defects. Use of the contact form does not, by itself, create a
        contractual relationship.
      </p>
    ),
  },
  {
    id: "limitation",
    heading: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, {siteConfig.legalName} will not
        be liable for any indirect, incidental, special, consequential or
        punitive damages arising out of your use of the site. Liability under
        client engagements is governed by the relevant contract.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of France. Any dispute that
        cannot be resolved amicably will be submitted to the exclusive
        jurisdiction of the competent courts of Paris, France.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. Material changes are
        announced on this page with a refreshed &quot;Last updated&quot;
        date.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of service"
      title={
        <>
          <span className="gradient-text-soft">The rules of the road</span>{" "}
          <span className="gradient-text">for using our site.</span>
        </>
      }
      lede="Short, readable and written in plain language. Engagement contracts override these terms where they apply."
      lastUpdated="May 2026"
      sections={sections}
    />
  );
}
