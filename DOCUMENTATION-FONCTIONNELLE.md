# Documentation fonctionnelle — Site officiel PhiBrain

> **Audience visée :** équipes techniques francophones (ingénieurs front-end, back-end, DevOps, sécurité, product managers) appelées à maintenir, étendre ou auditer le site officiel de PhiBrain.
>
> Ce document décrit l'architecture, les choix de conception, les fonctionnalités, la sécurité, l'accessibilité, le SEO, la performance, la procédure de déploiement et les recommandations de maintenance et d'extension.

---

## 1. Vue d'ensemble du projet

Le site officiel PhiBrain est une application web premium conçue pour positionner PhiBrain comme un studio d'ingénierie produit haut de gamme. L'objectif est de transformer chaque visiteur qualifié en prise de contact via une expérience visuelle moderne, performante et digne de confiance.

### 1.1 Objectifs fonctionnels

- Présenter clairement l'offre de service (web, mobile, UI/UX, API, cloud, modernisation, support).
- Mettre en avant le savoir-faire à travers un portfolio crédible.
- Capturer des prospects via un formulaire de contact sécurisé.
- Soutenir le référencement naturel et la performance Core Web Vitals.
- Respecter la conformité RGPD et les bonnes pratiques OWASP.

### 1.2 Pile technologique

| Couche             | Technologie                                                       |
| ------------------ | ----------------------------------------------------------------- |
| Framework          | **Next.js 14** (App Router, Server Components, Edge middleware)   |
| Langage            | **TypeScript** (mode `strict`, `noUncheckedIndexedAccess`)        |
| Styles             | **TailwindCSS 3** + thème personnalisé issu du logo officiel      |
| Animations         | **Framer Motion** (avec respect de `prefers-reduced-motion`)      |
| Primitives UI      | **Radix UI** (Accordion, Label, Slot) + composants de style shadcn|
| Icônes             | **Lucide React**                                                  |
| Validation         | **Zod**                                                           |
| Polices            | **Sora**, **Inter**, **JetBrains Mono** via `next/font/google`    |

---

## 2. Architecture des dossiers

```
site phi 2/
├── app/                            Routes App Router
│   ├── about/page.tsx              Page « À propos »
│   ├── api/contact/route.ts        Endpoint sécurisé du formulaire de contact
│   ├── contact/page.tsx            Page de contact
│   ├── portfolio/page.tsx          Page portfolio
│   ├── services/page.tsx           Page services
│   ├── error.tsx                   Frontière d'erreur globale
│   ├── globals.css                 Tokens CSS et utilitaires Tailwind
│   ├── layout.tsx                  Layout racine, métadonnées, JSON-LD
│   ├── manifest.ts                 Manifeste PWA
│   ├── not-found.tsx               Page 404
│   ├── opengraph-image.tsx         Image OG dynamique (Edge)
│   ├── page.tsx                    Accueil
│   ├── robots.ts                   robots.txt
│   └── sitemap.ts                  sitemap.xml
├── components/
│   ├── brand/Logo.tsx              Composant logo (variant `full` / `mark`)
│   ├── effects/                    Effets visuels (Reveal, GradientOrb, GridBackground, NoiseOverlay)
│   ├── layout/                     Navbar, MobileMenu, Footer
│   ├── sections/                   Sections de page (Hero, Services, WhyUs, …)
│   ├── ui/                         Primitives (Button, Card, Input, Textarea, Label, Accordion, Badge, SectionHeading)
│   └── ContactForm.tsx             Formulaire de contact côté client
├── lib/
│   ├── projects.ts                 Données du portfolio
│   ├── rate-limit.ts               Limiteur de débit en mémoire
│   ├── security.ts                 Helpers CSRF
│   ├── site.ts                     Configuration globale (nom, URL, nav, social)
│   ├── utils.ts                    `cn` (class merging), URL absolue
│   └── validation.ts               Schémas Zod et helpers (escape HTML)
├── public/                         Actifs publics (logo, favicon)
├── middleware.ts                   CSP, cookie CSRF, en-têtes de sécurité
├── tailwind.config.ts              Thème, animations, ombres, fonds
├── next.config.mjs                 En-têtes HTTP, optimisations, images
└── tsconfig.json                   Configuration TypeScript stricte
```

---

## 3. Pages du site

### 3.1 Accueil (`app/page.tsx`)

Compose dans cet ordre les sections clés :

1. **Hero** — proposition de valeur, double CTA (« Start a project » / « See our work »), illustration de dashboard SVG, indicateurs clés (taux de rétention, temps de réponse, projets livrés).
2. **TrustBar** — bandeau défilant (marquee) des partenaires.
3. **ServicesShowcase (variant `home`)** — six services + lien « See all services ».
4. **WhyUs** — six principes différenciants (Sécurité, Performance, Architecture, Partenariat senior, Conformité, Orienté résultat).
5. **FeaturedWork** — trois projets phare avec maquettes SVG stylisées.
6. **Process** — cinq phases (Discovery → Design → Engineering → Launch → Evolve).
7. **Technologies** — pile technique groupée (Frontend, Mobile, Backend, Data, Cloud, Quality).
8. **Testimonials** — quatre témoignages clients.
9. **FAQ** — six questions/réponses (accordéon accessible).
10. **CTASection** — bloc d'appel à l'action final.

### 3.2 À propos (`app/about/page.tsx`)

- Hero d'introduction au studio.
- **Notre histoire** — narrative en deux colonnes.
- **Mission / Vision** — deux cartes équilibrées.
- **Valeurs** — quatre principes opérationnels.
- **Méthodologie** — trois piliers (Stratégie, Mesure, Design).
- **CTASection** final.

### 3.3 Services (`app/services/page.tsx`)

- Hero contextuel.
- **ServicesShowcase (variant `full`)** — sept services détaillés.
- **Process** — réutilise la même section que l'accueil.
- **Technologies** — réutilise la même section.
- **CTASection**.

### 3.4 Portfolio (`app/portfolio/page.tsx`)

- Hero introductif.
- Liste complète des six projets (issus de `lib/projects.ts`), chaque projet présentant :
  - catégorie, année, résumé, description détaillée,
  - trois indicateurs de résultat (KPI),
  - tags techniques,
  - mockup SVG (composant `ProjectVisual` adapté au type de projet).
- Alternance gauche/droite pour le rythme visuel.
- **CTASection**.

### 3.5 Contact (`app/contact/page.tsx`)

- Hero court et CTA implicite.
- **Formulaire** sécurisé (`components/ContactForm.tsx`).
- Carte « Reach us directly » (email + réseaux sociaux).
- Garanties (Réponse 24 h, NDA, Chiffrement).
- Mention RGPD (`#privacy`).

---

## 4. Composants majeurs

### 4.1 Layout

- **`Navbar`** (`components/layout/Navbar.tsx`) — barre fixe qui passe de transparente à pleine au scroll (effet glassmorphism). Affiche les liens principaux, le logo et un CTA primaire.
- **`MobileMenu`** (`components/layout/MobileMenu.tsx`) — overlay animé avec **Framer Motion**, ferme le scroll body, ferme automatiquement au changement de route.
- **`Footer`** (`components/layout/Footer.tsx`) — colonnes de liens (Studio / Capacités / Ressources), liens sociaux, mention de copyright dynamique.

### 4.2 Marque

- **`Logo`** (`components/brand/Logo.tsx`) — utilise `next/image` pour servir `phibrain-logo.svg` ou `phibrain-mark.svg`. Cliquable et accessible (`aria-label`).

### 4.3 Effets visuels

- **`GridBackground`** — grille subtile masquée radialement.
- **`GradientOrb`** — orbe lumineux animé (palette brand).
- **`NoiseOverlay`** — film grain léger pour casser les dégradés.
- **`Reveal`** — wrapper qui anime ses enfants à l'arrivée dans le viewport (avec respect de `prefers-reduced-motion`).

### 4.4 Primitives UI (`components/ui/`)

Toutes les primitives respectent l'API shadcn/UI (className, forwardRef, variantes via `class-variance-authority`) :

- `Button` — variantes `primary`, `secondary`, `outline`, `ghost`, `link` + tailles `sm`/`md`/`lg`/`xl`/`icon`.
- `Badge`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`.
- `Input`, `Textarea`, `Label`.
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` (Radix UI).
- `SectionHeading` — eyebrow + titre dégradé + description, alignements left/center.

### 4.5 Sections

Chaque section sous `components/sections/` est isolée, autonome et réutilisable :

| Composant            | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `Hero`               | Premier écran, animations cascadées, dashboard SVG, statistiques.   |
| `TrustBar`           | Marquee infinie des partenaires.                                    |
| `ServicesShowcase`   | Variantes `home` (6 cartes + CTA) ou `full` (7 cartes).             |
| `WhyUs`              | Grille 3×2 de différenciateurs, fond cellulaire.                    |
| `FeaturedWork`       | Trois projets sélectionnés + mockups SVG par catégorie.             |
| `Process`            | Cinq étapes alignées en grille horizontale.                         |
| `Technologies`       | Six groupes de stack avec puces interactives.                       |
| `Testimonials`       | Quatre témoignages stylisés avec quote SVG en fond.                 |
| `FAQ`                | Accordéon accessible (Radix), 6 entrées.                            |
| `CTASection`         | Bloc final premium avec dégradés brand.                             |

---

## 5. Système de design

### 5.1 Tokens issus du logo

Le fichier `public/phibrain-logo.svg` (logo officiel) définit la charte :

- **Cyan brand `#29ABE2`** → exposé via la palette `brand-50 → brand-950`.
- **Anthracite `#3C3C3C`** → exposé via `ink-700` (+ palette complète `ink-50 → ink-950`).
- **Blanc / gris clairs** → tokens `background`, `card`, `muted`.

Les variables CSS (`app/globals.css`) gèrent les thèmes clair/sombre. Le site est **sombre par défaut** (`<html class="dark">`) pour une identité plus premium.

### 5.2 Typographie

- **Sora** (700-800) pour les titres d'affichage (`font-display`).
- **Inter** pour le texte UI (`font-sans`).
- **JetBrains Mono** pour les chips monospace (`font-mono`).
- Chargées via `next/font/google` avec `display: swap` pour éviter le CLS.

### 5.3 Hiérarchie visuelle

- Tailles fluides via `clamp()` (`text-display-2xl`, `xl`, `lg`).
- `text-balance` et `text-pretty` pour la mise en page typographique.
- Ombres `elevation-1 → 4` + `glow-brand` pour la profondeur premium.

---

## 6. Navigation et interactions

- Navigation entre routes via `next/link` (pré-rendu et préchargement automatique).
- **Indicateur d'état actif** dans la `Navbar` (pastille de fond translucide).
- **Smooth scroll** activé via CSS.
- **Skip link** (« Skip to content ») accessible au clavier dès le chargement.
- **Mobile** : menu plein écran avec verrouillage du scroll body.
- **Animations** : entrée à l'arrivée dans le viewport (Reveal), hover translation Y, pulse-glow, marquee, transitions de couleur subtiles. Toutes désactivées si `prefers-reduced-motion: reduce`.

---

## 7. SEO

### 7.1 Métadonnées (Metadata API)

- `app/layout.tsx` configure `title.default`, `title.template`, `description`, `openGraph`, `twitter`, `robots`, `icons`, `metadataBase`.
- Chaque page exporte son propre objet `metadata` avec `alternates.canonical`.

### 7.2 Données structurées

- JSON-LD `Organization` injecté dans `<head>` via `dangerouslySetInnerHTML` (sécurisé, données contrôlées).
- Référence le logo, l'URL, les réseaux sociaux et le contact.

### 7.3 Sitemap / robots / manifest

- `app/sitemap.ts` — génère le sitemap dynamiquement.
- `app/robots.ts` — autorise `/`, bloque `/api/`.
- `app/manifest.ts` — manifeste PWA avec couleurs de thème.

### 7.4 Image Open Graph

- `app/opengraph-image.tsx` — image OG 1200×630 générée à la volée (Edge runtime) avec le branding PhiBrain.

---

## 8. Accessibilité

Conformité visée : **WCAG 2.2 AA**.

- HTML sémantique : `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<figure>`, `<blockquote>`, `<ol>`.
- Skip link en haut du DOM (visible au focus).
- Tous les états de focus visibles : `focus-visible:ring-2 ring-brand-500`.
- Labels associés à tous les champs de formulaire (composant `Label` Radix).
- Boutons icônes : `aria-label` explicite.
- Icônes décoratives : `aria-hidden="true"`.
- Contrastes vérifiés sur les couleurs brand vs background (clair et sombre).
- `prefers-reduced-motion` désactive ou raccourcit toutes les animations.
- Le mobile menu utilise `role="dialog"` et `aria-modal="true"` avec gestion du focus implicite par Framer Motion.

---

## 9. Sécurité (OWASP-aligned)

### 9.1 Middleware (`middleware.ts`)

À chaque requête :

1. **Génère un nonce CSP** (`crypto.randomUUID()`).
2. Construit un en-tête **Content-Security-Policy strict** :
   - `default-src 'self'`
   - `script-src 'self' 'nonce-…' 'strict-dynamic'`
   - `style-src 'self' 'unsafe-inline' fonts.googleapis.com`
   - `font-src 'self' fonts.gstatic.com data:`
   - `img-src 'self' data: blob: https:`
   - `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`
   - `form-action 'self'`, `upgrade-insecure-requests`
3. Réaffirme `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
4. **Émet un cookie CSRF** (`csrf-token`) s'il est absent (token aléatoire base64url 24 octets, `SameSite=Lax`, `Secure` en prod, durée 8 h).

### 9.2 En-têtes HTTP (`next.config.mjs`)

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `X-DNS-Prefetch-Control: on`
- `poweredByHeader: false` (suppression de `X-Powered-By`).

### 9.3 Validation et formulaire (`lib/validation.ts` + `app/api/contact/route.ts`)

Le formulaire de contact applique la défense en profondeur :

1. **Borne de taille** — corps limité à 32 Ko.
2. **CSRF double-submit** — comparaison constante avec `timingSafeEqual`.
3. **Rate-limit IP** — 5 requêtes / heure / IP (clé `contact:<ip>`).
4. **Honeypot `_hp`** — champ invisible, rejet silencieux s'il est rempli.
5. **Time-on-page `_ts`** — si l'écart est < 2 s, on retourne `ok: true` sans rien faire (silent drop).
6. **Validation Zod** stricte :
   - `name` : 2-80 caractères, pas de bytes de contrôle.
   - `email` : trim + lowercase + RFC 5321 longueur max + parsing.
   - `company` : optionnel, ≤ 120 caractères.
   - `budget` : énumération fermée.
   - `message` : 20-4000 caractères, pas de bytes de contrôle.
   - `consent` : boolean strict + refine `=== true`.
7. **HTML escaping** (`escapeHtml`) avant tout rendu (email transactionnel par exemple).
8. Méthode `GET` retourne **405**.

### 9.4 Variables d'environnement

- Aucune clé secrète n'est exposée côté client. Seules les variables préfixées `NEXT_PUBLIC_*` sont accessibles dans le navigateur.
- `.env.example` documente : `NEXT_PUBLIC_SITE_URL`, `CONTACT_INBOX_EMAIL`, et placeholders SMTP.
- `.env.local` est ignoré par git.

### 9.5 Frontières d'erreur

- `app/error.tsx` — capture les erreurs React non gérées, affiche un identifiant `digest` et un CTA de retry. **Aucune trace stack** n'est exposée côté client.
- `app/not-found.tsx` — page 404 brandée.

### 9.6 Dépendances

- Versions épinglées dans `package.json` (pas de `^` côté production critique). Mettre à jour régulièrement avec `npm audit`.

---

## 10. Performance

- **next/font** pour les polices (zéro CSS-shift, hébergement local, `display: swap`).
- **next/image** pour le logo (avec `priority`).
- Animations basées sur GPU (`transform`, `opacity`), réduites avec `prefers-reduced-motion`.
- Server Components par défaut (toutes les sections sauf `Hero`, `MobileMenu`, `ContactForm`, `FAQ`).
- `optimizePackageImports` activé pour `lucide-react` et `framer-motion`.
- Compression activée.

---

## 11. Comportement du formulaire de contact

Côté client (`components/ContactForm.tsx`) :

1. À l'affichage, le composant mémoïse `renderedAt = Date.now()`.
2. Lit le cookie `csrf-token` et l'injecte dans un champ caché.
3. Le honeypot `_hp` est positionné hors écran (`left: -10000px`).
4. À la soumission :
   - empêche la soumission par défaut,
   - construit un payload JSON,
   - POST `/api/contact` avec `credentials: same-origin`,
   - affiche un état `submitting` (spinner) puis `success` ou `error`.
5. Sur succès, affiche une carte de confirmation avec un bouton « Send another message ».
6. Les erreurs serveur (Zod) sont affichées **sous le champ concerné** et résumées via `role="alert"`.

Côté serveur (`app/api/contact/route.ts`) — voir section 9.3.

---

## 12. Déploiement

### 12.1 Vercel (recommandé)

1. `git init` + push sur GitHub.
2. Importer le dépôt dans Vercel.
3. Définir les variables : `NEXT_PUBLIC_SITE_URL`, `CONTACT_INBOX_EMAIL`.
4. Vercel détecte Next.js et déploie automatiquement.
5. Activer **Vercel Analytics** et **Speed Insights** si besoin.

### 12.2 Auto-hébergement

```bash
npm ci
npm run build
NODE_ENV=production node ./node_modules/next/dist/bin/next start -p 3000
```

Placez derrière un reverse proxy (Nginx, Caddy) terminant TLS. HSTS est déjà configuré côté application.

### 12.3 Configuration DNS

- `A` / `AAAA` ou `CNAME` vers la plateforme.
- Activer HTTPS automatique (Let's Encrypt ou plateforme).
- Optionnel : soumettre au [HSTS preload list](https://hstspreload.org/).

---

## 13. Recommandations de maintenance

| Cadence       | Action                                                                |
| ------------- | --------------------------------------------------------------------- |
| Hebdomadaire  | Vérifier les alertes Sentry (à brancher), lighthouse / Speed Insights |
| Mensuel       | `npm outdated` + tests + mise à jour des dépendances mineures         |
| Trimestriel   | Audit sécurité (CSP, dépendances, en-têtes), revue des KPIs           |
| Annuel        | Audit accessibilité complet (axe, audit manuel clavier)               |

Pensez également à :

- **Régénérer le contenu du portfolio** (`lib/projects.ts`) au fil des projets.
- **Mettre à jour les testimonials** avec de vraies citations clients (avec leur accord écrit).
- **Connecter le formulaire** à un service email transactionnel (Resend, Postmark, AWS SES) — point d'extension marqué dans `app/api/contact/route.ts`.
- **Brancher la limite de débit** sur Redis/Upstash si déployé en multi-instance (l'API est identique).

---

## 14. Comment étendre le site

### 14.1 Ajouter une nouvelle page

1. Créer `app/<route>/page.tsx`.
2. Exporter `metadata` (titre, description, canonical).
3. Réutiliser `SectionHeading`, `Reveal`, `GridBackground` pour conserver la cohérence visuelle.
4. Ajouter la route dans `app/sitemap.ts`.
5. Ajouter (si pertinent) un lien dans `siteConfig.navigation` (`lib/site.ts`) ou dans `Footer.tsx`.

### 14.2 Ajouter un nouveau service ou un nouveau projet

- Services : ajouter une entrée dans `services` (composant `ServicesShowcase`).
- Projets : ajouter une entrée dans `PROJECTS` (`lib/projects.ts`), et un `ProjectVisual` adapté.

### 14.3 Modifier le branding

- Couleurs : `tailwind.config.ts` (clés `brand` et `ink`) — toutes les sections utilisent ces tokens.
- Typographie : `app/layout.tsx` (Inter / Sora / JetBrains Mono).
- Logo : remplacer `public/phibrain-logo.svg` et `public/phibrain-mark.svg`.

### 14.4 Internationalisation (i18n)

Le projet est prêt pour i18n :

1. Installer `next-intl` (ou utiliser le routage natif `app/[locale]/`).
2. Externaliser les chaînes UI (sections, navigation, formulaire).
3. Ajouter les locales dans `lib/site.ts`.

---

## 15. Annexes

### 15.1 Conventions de code

- **TypeScript strict**, types explicites pour toute fonction exportée.
- **Server Components** par défaut, `"use client"` uniquement quand nécessaire (interactions, hooks d'état, motion).
- **Tailwind first**, pas de CSS-in-JS.
- Fonctions utilitaires partagées dans `lib/`.
- Pas de dépendances obscures : préférence pour des composants Radix + shadcn-style maison.

### 15.2 Glossaire

- **CSP** — Content-Security-Policy.
- **CSRF** — Cross-Site Request Forgery.
- **HSTS** — HTTP Strict Transport Security.
- **JSON-LD** — Linked Data au format JSON, utilisé pour les Rich Results Google.
- **OG image** — image partagée sur les réseaux sociaux et messageries (Open Graph).
- **OWASP Top 10** — référentiel des risques de sécurité applicative les plus critiques.

---

**Mainteneur :** équipe ingénierie PhiBrain.
**Dernière mise à jour :** mai 2026.
