# PhiBrain — Official Website

The marketing site for **PhiBrain**, a senior product engineering studio. Built as a premium, production-ready Next.js 14 application with strong security defaults, semantic HTML, fluid motion and a brand-consistent design system extracted from the official logo.

---

## Tech stack

- **Next.js 14** — App Router, Server Components, Edge middleware, Image / Font / Metadata APIs.
- **TypeScript** — strict mode, `noUncheckedIndexedAccess`.
- **TailwindCSS 3** — custom brand tokens, dark-first, CSS-variable theming.
- **Framer Motion** — entrance animations, micro-interactions, reduced-motion respect.
- **Radix UI** (Accordion, Label, Slot) — accessible primitives wrapped with shadcn-style styling.
- **React Hook Form** + **@hookform/resolvers** + **Zod** — typed, validated contact form.
- **Lucide** — icon system.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev
```

The site runs at `http://localhost:3000`.

### Available scripts

| Script              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Start the dev server with HMR                                |
| `npm run build`     | Production build                                             |
| `npm run start`     | Start the production server                                  |
| `npm run lint`      | Run ESLint                                                   |
| `npm run typecheck` | TypeScript-only check (no emit)                              |

---

## Project structure

```
.
├── app/                              Next.js App Router
│   ├── about/                        /about
│   ├── api/contact/route.ts          Secure contact endpoint
│   ├── contact/                      /contact (12-field enterprise form)
│   ├── cookies/                      /cookies
│   ├── portfolio/
│   │   ├── page.tsx                  /portfolio (index)
│   │   └── [slug]/page.tsx           /portfolio/<slug> (6 case studies)
│   ├── privacy/                      /privacy
│   ├── security/                     /security (public security statement)
│   ├── services/                     /services
│   ├── terms/                        /terms
│   ├── error.tsx                     Root error boundary
│   ├── globals.css                   Tailwind layers + tokens
│   ├── layout.tsx                    Root layout, metadata, JSON-LD (nonced)
│   ├── manifest.ts                   PWA manifest
│   ├── not-found.tsx                 404
│   ├── opengraph-image.tsx           Dynamic OG image (edge)
│   ├── page.tsx                      Home
│   ├── robots.ts                     robots.txt
│   └── sitemap.ts                    sitemap.xml (core + portfolio + legal)
├── components/
│   ├── brand/Logo.tsx
│   ├── effects/                      Background visuals
│   ├── layout/                       Navbar, MobileMenu, Footer
│   ├── legal/LegalPage.tsx           Shared legal-page template
│   ├── sections/                     Hero, Services, Why, Tech, Process (8), …
│   ├── ui/                           Button, Card, Input, Textarea, …
│   └── ContactForm.tsx
├── lib/
│   ├── projects.ts                   Enriched case-study data
│   ├── rate-limit.ts                 In-memory limiter
│   ├── security.ts                   Edge-safe CSRF helpers (Web Crypto)
│   ├── site.ts                       Site-wide config + legal nav
│   ├── utils.ts                      `cn`, URL helpers
│   └── validation.ts                 Zod schemas (12 fields)
├── public/                           Logo, mark, favicon
├── middleware.ts                     Dev/prod CSP, CSRF cookie, headers
├── tailwind.config.ts
├── next.config.mjs
└── DOCUMENTATION-FONCTIONNELLE.md
```

---

## Brand system

Colors and typography are extracted from `public/phibrain-logo.svg`:

| Token             | Value     | Usage                            |
| ----------------- | --------- | -------------------------------- |
| `brand-500`       | `#29ABE2` | Primary cyan from the logo       |
| `brand-300/700`   | scale     | Hover / depth                    |
| `ink-700/900/950` | `#3C3C3C`+| Anthracite text & deep surfaces  |
| Fonts             | Sora, Inter, JetBrains Mono | Display / UI / mono |

---

## Security (highlights)

- **Nonce-based CSP in production**, set on both request + response so Next.js auto-stamps its inline scripts. Permissive policy in dev (HMR / Fast Refresh).
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, **HSTS preload**, **Permissions-Policy**, COOP / CORP.
- Contact API defence-in-depth: 64 KB body cap → Content-Type allowlist → **CSRF (double-submit cookie)** → **per-IP rate-limit (5/h)** → **per-IP+UA fingerprint rate-limit (3/15 min)** → **time-on-page check** → **honeypot** → **Zod validation** → **HTML escape**.
- No secrets in client code. `.env.example` documents required server-only variables.
- Public `/security` page lists the posture and a responsible-disclosure policy with response SLAs.

See `DOCUMENTATION-FONCTIONNELLE.md` for the full narrative (French).

---

## Deployment

Optimised for **Vercel**, but works on any Node 18.17+ host.

1. `npm run build`
2. Set `NEXT_PUBLIC_SITE_URL`, `CONTACT_INBOX_EMAIL` (+ SMTP vars if you wire up email).
3. `npm run start`

For Vercel, push the repo and connect it — `next.config.mjs` and `middleware.ts` are picked up automatically.

---

## License

© PhiBrain Inc. — all rights reserved.
