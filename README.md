# PhiBrain — Official Website

The marketing site for **PhiBrain**, a senior product engineering studio. Built as a premium, production-ready Next.js 14 application with strong security defaults, semantic HTML, fluid motion and a brand-consistent design system extracted from the official logo.

> Replaces the previous Vite/Vercel build at https://phibrain.vercel.app/

---

## Tech stack

- **Next.js 14** — App Router, Server Components, Edge middleware, Image / Font / Metadata APIs.
- **TypeScript** — strict mode, `noUncheckedIndexedAccess`.
- **TailwindCSS 3** — custom brand tokens, dark-first, design tokens via CSS variables.
- **Framer Motion** — entrance animations, micro-interactions, reduced-motion respect.
- **Radix UI** (Accordion, Label, Slot) — accessible primitives wrapped with shadcn-style styling.
- **Lucide** — icon system.
- **Zod** — runtime validation for API inputs.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev
```

The site runs at `http://localhost:3000`.

### Available scripts

| Script             | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `npm run dev`      | Start the dev server with HMR                                |
| `npm run build`    | Production build                                             |
| `npm run start`    | Start the production server                                  |
| `npm run lint`     | Run ESLint                                                   |
| `npm run typecheck` | TypeScript-only check (no emit)                             |

---

## Project structure

```
.
├── app/                          # Next.js App Router
│   ├── about/                    # /about
│   ├── api/contact/route.ts      # Secure contact endpoint
│   ├── contact/                  # /contact
│   ├── portfolio/                # /portfolio
│   ├── services/                 # /services
│   ├── error.tsx                 # Root error boundary
│   ├── globals.css               # Tailwind layers + tokens
│   ├── layout.tsx                # Root layout, metadata, JSON-LD
│   ├── manifest.ts               # PWA manifest
│   ├── not-found.tsx             # 404
│   ├── opengraph-image.tsx       # Dynamic OG image (edge)
│   ├── page.tsx                  # Home
│   ├── robots.ts                 # robots.txt
│   └── sitemap.ts                # sitemap.xml
├── components/
│   ├── brand/Logo.tsx
│   ├── effects/                  # Background visuals
│   ├── layout/                   # Navbar, MobileMenu, Footer
│   ├── sections/                 # Hero, Services, Why, Tech, …
│   ├── ui/                       # Button, Card, Input, …
│   └── ContactForm.tsx
├── lib/
│   ├── projects.ts               # Portfolio data
│   ├── rate-limit.ts             # In-memory limiter
│   ├── security.ts               # CSRF helpers
│   ├── site.ts                   # Site-wide config
│   ├── utils.ts                  # `cn`, URL helpers
│   └── validation.ts             # Zod schemas
├── public/
│   ├── phibrain-logo.svg
│   ├── phibrain-mark.svg
│   └── favicon.svg
├── middleware.ts                 # CSP nonce, CSRF cookie, headers
├── tailwind.config.ts
├── next.config.mjs
└── DOCUMENTATION-FONCTIONNELLE.md
```

---

## Brand system

Colors and typography are extracted from `public/phibrain-logo.svg`:

| Token            | Value     | Usage                           |
| ---------------- | --------- | ------------------------------- |
| `brand-500`      | `#29ABE2` | Primary cyan from the logo      |
| `brand-300/700`  | scale     | Hover / depth                   |
| `ink-700/900/950`| `#3C3C3C`+| Anthracite text & deep surfaces |
| Fonts            | Sora, Inter, JetBrains Mono | Display / UI / mono |

---

## Security

See `DOCUMENTATION-FONCTIONNELLE.md` for the full security narrative. Highlights:

- Strict, **nonce-based CSP** generated per-request in `middleware.ts`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, **HSTS preload**, **Permissions-Policy**, COOP / CORP.
- Contact API: **CSRF (double-submit cookie)**, **Zod validation**, **per-IP rate-limit**, **time-on-page check**, **honeypot**, HTML escaping before any echo.
- No secrets in client code; `.env.example` documents required server-only variables.

---

## Deployment

Optimised for **Vercel**, but works on any Node 18+ host.

1. `npm run build`
2. Set `NEXT_PUBLIC_SITE_URL`, `CONTACT_INBOX_EMAIL` (+ SMTP vars if you wire up email).
3. `npm run start`

For Vercel, push the repo and connect it — `next.config.mjs` and `middleware.ts` are picked up automatically.

---

## License

© PhiBrain Inc. — all rights reserved.
