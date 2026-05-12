import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Product engineering studio`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  keywords: [
    "PhiBrain",
    "product engineering",
    "Next.js development",
    "custom web applications",
    "mobile app development",
    "UI/UX design",
    "API engineering",
    "digital transformation",
    "enterprise software",
    "SaaS development",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Product engineering studio`,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Product engineering studio`,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: absoluteUrl("/phibrain-logo.svg"),
  description: siteConfig.description,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contactEmail,
      availableLanguage: ["English", "French"],
    },
  ],
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.twitter],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The CSP nonce is generated per-request by `middleware.ts` and forwarded
  // via the `x-nonce` request header. Applying it to our inline JSON-LD
  // <script> is required so the strict, nonce-based CSP doesn't block it.
  const nonce = headers().get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          nonce={nonce}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
