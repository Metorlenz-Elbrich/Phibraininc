# Documentation fonctionnelle — Site officiel PhiBrain

> **Audience visée :** équipes techniques francophones (ingénieurs front-end, back-end, DevOps, sécurité, product managers) appelées à maintenir, étendre ou auditer le site officiel de PhiBrain.
>
> Ce document décrit l'architecture, les choix de conception, les fonctionnalités, la sécurité, l'accessibilité, le SEO, la performance, la procédure de déploiement et les recommandations de maintenance et d'extension.

---

## 1. Vue d'ensemble du projet

Le site officiel PhiBrain est une application web premium conçue pour positionner PhiBrain comme un studio d'ingénierie produit haut de gamme. L'objectif est de transformer chaque visiteur qualifié en prise de contact via une expérience visuelle moderne, performante et digne de confiance.

### 1.1 Objectifs fonctionnels

- Présenter clairement l'offre de service (web sécurisé, mobile, UI/UX, API, cloud, modernisation, support).
- Mettre en avant le savoir-faire à travers un portfolio crédible avec **pages de cas d'étude détaillées**.
- Capturer des prospects qualifiés via un **formulaire de contact entreprise** (qualification du besoin, budget, calendrier, taille d'entreprise…).
- Soutenir le référencement naturel et la performance Core Web Vitals.
- Respecter la conformité RGPD et les bonnes pratiques OWASP.
- Exposer publiquement la posture de sécurité (`/security`) et la politique de divulgation responsable.

### 1.2 Pile technologique

| Couche             | Technologie                                                       |
| ------------------ | ----------------------------------------------------------------- |
| Framework          | **Next.js 14** (App Router, Server Components, Edge middleware)   |
| Langage            | **TypeScript** (mode `strict`, `noUncheckedIndexedAccess`)        |
| Styles             | **TailwindCSS 3** + thème personnalisé issu du logo officiel      |
| Animations         | **Framer Motion** (avec respect de `prefers-reduced-motion`)      |
| Primitives UI      | **Radix UI** (Accordion, Label, Slot) + composants de style shadcn|
| Formulaires        | **React Hook Form** + **@hookform/resolvers** + **Zod**           |
| Icônes             | **Lucide React**                                                  |
| Polices            | **Sora**, **Inter**, **JetBrains Mono** via `next/font/google`    |

---

## 2. Architecture des dossiers

```
site phi 2/
├── app/                              Routes App Router
│   ├── about/page.tsx                Page « À propos »
│   ├── api/contact/route.ts          Endpoint sécurisé du formulaire
│   ├── contact/page.tsx              Page contact (formulaire RHF + sidebar)
│   ├── cookies/page.tsx              Politique de cookies
│   ├── portfolio/
│   │   ├── page.tsx                  Index des cas d'étude
│   │   └── [slug]/page.tsx           Page de cas d'étude détaillée (6)
│   ├── privacy/page.tsx              Politique de confidentialité
│   ├── security/page.tsx             Déclaration de sécurité
│   ├── services/page.tsx             Page services
│   ├── terms/page.tsx                Conditions d'utilisation
│   ├── error.tsx                     Frontière d'erreur globale
│   ├── globals.css                   Tokens CSS et utilitaires Tailwind
│   ├── layout.tsx                    Layout racine, métadonnées, JSON-LD
│   ├── manifest.ts                   Manifeste PWA
│   ├── not-found.tsx                 Page 404
│   ├── opengraph-image.tsx           Image OG dynamique (Edge)
│   ├── page.tsx                      Accueil
│   ├── robots.ts                     robots.txt
│   └── sitemap.ts                    sitemap.xml (inclut cas d'étude + légal)
├── components/
│   ├── brand/Logo.tsx                Composant logo (variant `full` / `mark`)
│   ├── effects/                      Effets visuels (Reveal, GradientOrb, GridBackground, NoiseOverlay)
│   ├── layout/                       Navbar, MobileMenu, Footer
│   ├── legal/LegalPage.tsx           Template partagé des pages légales
│   ├── sections/                     Sections de page (Hero, Services, …)
│   ├── ui/                           Primitives (Button, Card, Input, …)
│   └── ContactForm.tsx               Formulaire de contact RHF + Zod
├── lib/
│   ├── projects.ts                   Données enrichies du portfolio
│   ├── rate-limit.ts                 Limiteur en mémoire
│   ├── security.ts                   Helpers CSRF (Edge-safe, Web Crypto)
│   ├── site.ts                       Configuration globale + nav légale
│   ├── utils.ts                      `cn` (class merging), URL absolue
│   └── validation.ts                 Schémas Zod (formulaire 12 champs)
├── public/                           Logo, favicon, OG
├── middleware.ts                     CSP nonce-based (dev/prod), CSRF cookie
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## 3. Pages du site

### 3.1 Accueil (`app/page.tsx`)

Compose les sections clés :

1. **Hero** — proposition de valeur, double CTA (« Book a discovery call » / « View case studies »), illustration de dashboard SVG, indicateurs clés.
2. **TrustBar** — bandeau défilant des partenaires.
3. **ServicesShowcase (variant `home`)** — six services entièrement cliquables + lien « See all capabilities ».
4. **WhyUs** — six principes différenciants.
5. **FeaturedWork** — trois cas d'étude pointant vers `/portfolio/<slug>`.
6. **Process** — huit phases (Discovery → Product Strategy → Architecture → Design → Development → Security review → Deployment → Maintenance).
7. **Technologies** — pile technique groupée.
8. **Testimonials** — témoignages clients.
9. **FAQ** — dix questions orientées conversion (pricing, timelines, ownership, NDAs, sécurité, conformité…).
10. **CTASection** — appel à l'action final.

### 3.2 À propos (`app/about/page.tsx`)

- Hero d'introduction au studio.
- **Notre histoire** — narration en deux colonnes.
- **Mission / Vision** — deux cartes équilibrées.
- **Valeurs** — quatre principes opérationnels.
- **Méthodologie** — trois piliers (Stratégie, Mesure, Design).
- **CTASection** final.

### 3.3 Services (`app/services/page.tsx`)

- Hero contextuel.
- **ServicesShowcase (variant `full`)** — sept cartes cliquables avec ancres :
  `#web` · `#mobile` · `#design` · `#api` · `#cloud` · `#modernization` · `#support`.
  Chaque carte est un `<Link>` accessible clavier (focus ring visible).
- **Process** — huit étapes (réutilise la section).
- **Technologies** — pile technique.
- **CTASection**.

### 3.4 Portfolio (`app/portfolio/page.tsx` + `app/portfolio/[slug]/page.tsx`)

- **Index** (`/portfolio`) : six cartes cliquables vers les pages de détail.
- **Détail** (`/portfolio/<slug>`) : pour chaque projet, une page complète avec :
  - hero + indicateurs de résultat (KPI),
  - description narrative,
  - bloc « The challenge » + « Our solution »,
  - bloc « Architecture » (highlights système),
  - bloc « Security » (durcissement & conformité),
  - liste détaillée du stack technique,
  - section « More case studies » (3 autres projets).

Les pages détail sont **statiquement générées** via `generateStaticParams()` et exposent `generateMetadata()` (canonical, OG, description).

### 3.5 Contact (`app/contact/page.tsx`)

- Hero court.
- **Formulaire entreprise** (12 champs) — voir section 6.
- Carte « Reach us directly » (email + réseaux sociaux).
- Garanties (Réponse 24 h, NDA, Chiffrement).
- Mention RGPD avec lien vers `/privacy`.

### 3.6 Pages légales

Toutes basées sur le template partagé `components/legal/LegalPage.tsx` :

- **`/privacy`** — politique de confidentialité (collecte, finalités, bases légales, durées de conservation, sous-traitants, droits).
- **`/terms`** — conditions d'utilisation (usage acceptable, propriété intellectuelle, limitations, droit applicable).
- **`/cookies`** — liste exhaustive des cookies (uniquement `csrf-token` strictement nécessaire).
- **`/security`** — déclaration de sécurité publique + politique de divulgation responsable.

Chaque page expose :
- titre + lede + date de mise à jour,
- table des matières sticky (≥ lg),
- ancres scrollables par section.

---

## 4. Composants majeurs

### 4.1 Layout & navigation

- **`Navbar`** (`components/layout/Navbar.tsx`) — barre fixe glassmorphique. CTA primaire « Book a discovery call » lu depuis `siteConfig.primaryCta`.
- **`MobileMenu`** (`components/layout/MobileMenu.tsx`) — overlay animé avec Framer Motion, verrouillage du scroll body.
- **`Footer`** (`components/layout/Footer.tsx`) — quatre colonnes (Sitemap / Capabilities / Case studies / Légal). Inclut les liens légaux : privacy, terms, cookies, security.

### 4.2 Sections (`components/sections/`)

| Composant            | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `Hero`               | Premier écran, animations cascadées, dashboard SVG.                 |
| `TrustBar`           | Marquee infinie des partenaires.                                    |
| `ServicesShowcase`   | 6 ou 7 cartes **cliquables** vers `/services#<id>`.                 |
| `WhyUs`              | Grille 3×2 de différenciateurs.                                     |
| `FeaturedWork`       | Trois projets cliquables → pages détail.                            |
| `Process`            | **Huit étapes** alignées (grille 4 colonnes sur lg).                |
| `Technologies`       | Six groupes de stack.                                               |
| `Testimonials`       | Quatre témoignages stylisés.                                        |
| `FAQ`                | Accordéon Radix, **10 entrées** orientées conversion.               |
| `CTASection`         | Bloc final premium.                                                 |

### 4.3 Pages légales (`components/legal/LegalPage.tsx`)

Template réutilisable. Reçoit `eyebrow`, `title`, `lede`, `lastUpdated` et un tableau `sections: { id, heading, body }[]` pour générer le titre, la TOC sticky et chaque section ancrée.

### 4.4 Formulaire de contact (`components/ContactForm.tsx`)

Voir section 6.

---

## 5. Système de design

### 5.1 Tokens issus du logo officiel

- **Cyan brand `#29ABE2`** → palette `brand-50 → brand-950`.
- **Anthracite `#3C3C3C`** → palette `ink-50 → ink-950`.
- Variables CSS (`app/globals.css`) gèrent thèmes clair/sombre (sombre par défaut).

### 5.2 Typographie

- **Sora** (700-800) pour les titres d'affichage (`font-display`).
- **Inter** pour le texte UI (`font-sans`).
- **JetBrains Mono** pour les chips monospace.
- Chargées via `next/font/google` (`display: swap`).

### 5.3 Profondeur & motion

- Ombres `elevation-1 → 4` + `glow-brand`.
- Animations cascadées via le composant `Reveal` (Framer Motion).
- Respect strict de `prefers-reduced-motion`.

---

## 6. Formulaire de contact (entreprise)

### 6.1 Schéma (12 champs)

| Champ             | Type     | Validation                          |
| ----------------- | -------- | ----------------------------------- |
| `name`            | string   | 2–80 caractères                     |
| `email`           | string   | RFC + max 254                       |
| `company`         | string?  | ≤ 120 caractères                    |
| `phone`           | string?  | regex `^\+?\d{6,20}$`               |
| `service`         | enum     | 8 valeurs                           |
| `projectType`     | enum     | 5 valeurs (new product, redesign…)  |
| `companySize`     | enum?    | 5 valeurs                           |
| `budget`          | enum     | 5 valeurs                           |
| `timeline`        | enum     | 5 valeurs (asap → exploring)        |
| `preferredContact`| enum     | email / phone / video               |
| `message`         | string   | 20–4000 caractères, sans contrôle   |
| `consent`         | bool     | `=== true` requis                   |

Champs cachés anti-spam : `_hp` (honeypot), `_ts` (timestamp), `csrf` (token CSRF).

### 6.2 Architecture client (React Hook Form)

- `useForm<ContactFormData>` avec `zodResolver(ContactFormSchema)`.
- Validation `onBlur` + soumission `handleSubmit`.
- Composants typés : `Field`, `Fieldset`, `SelectField` (avec `forwardRef`).
- Erreurs serveur (par champ ou globales) affichées sous le champ concerné, résumé `role="alert"`.
- Lecture sécurisée du cookie `csrf-token` côté client + injection dans le payload.

### 6.3 Pipeline serveur (`app/api/contact/route.ts`)

Défense en profondeur (ordre d'exécution) :

1. **Limite de taille** — corps borné à 64 Ko.
2. **Allowlist Content-Type** — `application/json` uniquement.
3. **CSRF double-submit** — comparaison constante (`constantTimeEquals`, Edge-safe).
4. **Rate-limit par IP** — 5 requêtes / heure.
5. **Rate-limit par fingerprint IP+UA** — 3 requêtes / 15 minutes (atténue les abus scriptés).
6. **Time-on-page heuristic** — silent-drop si remplissage < 2,5 s.
7. **Honeypot `_hp`** — silent-drop si rempli.
8. **Validation Zod** stricte.
9. **HTML escape** (`escapeHtml`) avant tout rendu / envoi email.

Méthodes autres que `POST` → **405 Method Not Allowed**.

---

## 7. SEO

### 7.1 Métadonnées

- `app/layout.tsx` configure `title.default`, `title.template`, `openGraph`, `twitter`, `robots`, `metadataBase`.
- Chaque page exporte son propre `metadata` avec `alternates.canonical`.
- Les pages détail portfolio génèrent leurs métadonnées dynamiquement.

### 7.2 Données structurées

- JSON-LD `Organization` injecté dans `<head>` avec nonce CSP.

### 7.3 Sitemap / robots / manifest

- `app/sitemap.ts` — inclut routes core + 6 cas d'étude + 4 pages légales.
- `app/robots.ts` — autorise `/`, bloque `/api/`.
- `app/manifest.ts` — manifeste PWA.

### 7.4 Image Open Graph

- `app/opengraph-image.tsx` — 1200×630 générée à la volée (Edge).

---

## 8. Accessibilité

- HTML sémantique (`<main>`, `<nav>`, `<section>`, `<article>`, `<fieldset>`, `<legend>`…).
- Skip link visible au focus.
- Focus ring brand systématique (`focus-visible:ring-2 ring-brand-500`).
- Toutes les **cartes de services et de projets sont des `<Link>`** (clic + clavier + screen-reader).
- Labels associés à 100 % des champs de formulaire.
- ARIA `aria-invalid`, `aria-describedby`, `role="alert"` sur les erreurs.
- Respect de `prefers-reduced-motion`.

---

## 9. Sécurité (OWASP-aligned)

### 9.1 Middleware (`middleware.ts`)

- **CSP nonce-based en production** (sans `strict-dynamic`) — compatible Next.js App Router.
- **CSP relâchée en dev** (`'unsafe-eval' 'unsafe-inline'` + WebSocket localhost) — nécessaire pour React Fast Refresh.
- CSRF cookie idempotent (`csrf-token`, `SameSite=Lax`, `Secure` en prod, 8 h).
- En-têtes réaffirmés : `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.

### 9.2 Helpers `lib/security.ts`

- Edge-safe (Web Crypto `getRandomValues` + `btoa`, comparaison constante en JS pur).
- Pas de dépendance Node.js.

### 9.3 En-têtes HTTP (`next.config.mjs`)

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- COOP / CORP, `X-XSS-Protection`, `poweredByHeader: false`.

### 9.4 API contact

Voir section 6.3.

### 9.5 Page publique « Security statement » (`/security`)

Expose la posture (CSP, CSRF, rate-limit, validation, honeypot…) et la politique de divulgation responsable avec SLA :
- Accusé < 2 jours ouvrés.
- Triage < 5 jours ouvrés.
- Crédit chercheur sur demande.

### 9.6 Variables d'environnement

Aucune clé secrète exposée côté client. `.env.example` documente : `NEXT_PUBLIC_SITE_URL`, `CONTACT_INBOX_EMAIL`, placeholders SMTP.

### 9.7 Frontières d'erreur

- `app/error.tsx` — affiche un `digest` sans exposer la stack trace.
- `app/not-found.tsx` — 404 brandée.

---

## 10. Performance

- `next/font` pour zéro CLS.
- `next/image` pour le logo (`priority`).
- Animations GPU (`transform`, `opacity`) avec respect de la motion-reduce.
- Server Components par défaut.
- `optimizePackageImports` pour `lucide-react` et `framer-motion`.
- Compression activée.

---

## 11. Déploiement

### 11.1 Vercel (recommandé)

1. Push sur GitHub.
2. Importer dans Vercel.
3. Variables : `NEXT_PUBLIC_SITE_URL`, `CONTACT_INBOX_EMAIL`.
4. Vercel détecte Next.js et déploie automatiquement.

### 11.2 Auto-hébergement

```bash
npm ci
npm run build
NODE_ENV=production npm run start
```

Placer derrière un reverse proxy terminant TLS. HSTS déjà configuré côté application.

---

## 12. Recommandations de maintenance

| Cadence       | Action                                                                |
| ------------- | --------------------------------------------------------------------- |
| Hebdomadaire  | Surveillance des alertes Sentry (à brancher), Lighthouse / Speed Insights |
| Mensuel       | `npm outdated` + tests + mise à jour des dépendances mineures         |
| Trimestriel   | Audit sécurité (CSP, dépendances, en-têtes), revue des KPIs           |
| Annuel        | Audit accessibilité complet (axe, audit manuel clavier)               |

À envisager :

- Brancher le formulaire à un service email transactionnel (Resend, Postmark, AWS SES).
- Migrer la limite de débit sur Redis/Upstash en multi-instance.
- Externaliser le rate-limit en `lib/rate-limit-redis.ts` derrière la même interface.

---

## 13. Comment étendre le site

### 13.1 Ajouter une nouvelle page

1. `app/<route>/page.tsx`.
2. `metadata` (titre, description, `alternates.canonical`).
3. Réutiliser `SectionHeading`, `Reveal`, `GridBackground`.
4. Ajouter la route dans `app/sitemap.ts`.
5. Lien dans `siteConfig.navigation` ou `Footer.tsx`.

### 13.2 Ajouter un projet

1. Ajouter une entrée à `PROJECTS` dans `lib/projects.ts`.
2. `generateStaticParams()` la prendra en compte automatiquement.
3. Optionnellement ajouter un nouveau `ProjectVisual` (mockup SVG).

### 13.3 Ajouter une page légale

1. Créer `app/<route>/page.tsx`.
2. Importer `LegalPage` (`components/legal/LegalPage.tsx`).
3. Fournir `eyebrow`, `title`, `lede`, `lastUpdated`, `sections`.
4. Ajouter à `siteConfig.legal`.

### 13.4 Modifier le branding

- Couleurs : `tailwind.config.ts` (clés `brand` et `ink`).
- Typographie : `app/layout.tsx`.
- Logo : remplacer `public/phibrain-logo.svg` et `public/phibrain-mark.svg`.

### 13.5 Internationalisation

Projet prêt pour i18n :
1. Installer `next-intl` ou utiliser `app/[locale]/`.
2. Externaliser les chaînes UI.
3. Ajouter les locales dans `siteConfig`.

---

## 14. Annexes

### 14.1 Conventions

- **TypeScript strict**.
- **Server Components** par défaut, `"use client"` uniquement quand nécessaire.
- **Tailwind first**, pas de CSS-in-JS.
- Composants Radix + style maison shadcn.

### 14.2 Glossaire

- **CSP** — Content-Security-Policy.
- **CSRF** — Cross-Site Request Forgery.
- **HSTS** — HTTP Strict Transport Security.
- **JSON-LD** — Linked Data au format JSON.
- **OG image** — image Open Graph.
- **OWASP Top 10** — référentiel des risques applicatifs majeurs.
- **RHF** — React Hook Form.
- **SLO / SLA** — Service Level Objective / Agreement.

---

**Mainteneur :** équipe ingénierie PhiBrain.
**Dernière mise à jour :** mai 2026.
