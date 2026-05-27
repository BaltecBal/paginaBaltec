# SEO Optimization — Balanceo Baltec

_Version: v1 — codebase-only draft. Immutable after Phase 2 closes._

## Active Constraints

```
Hard:      none stated — full latitude, do whatever is needed for best SEO
Soft:      prefer minimal disruption to visual design
           defer blog and case study pages to a later plan
Scope in:  technical SEO (meta, OG, JSON-LD, sitemap, robots.txt)
           on-page content optimization (keywords, headings, copy)
           FAQ section (new component)
Scope out: blog section, case study pages, whitepaper/download assets
           backlink outreach (handled separately)
           SSR/SSG migration
Stop if:   (none declared — no automatic halt triggers)
```

## Context

Balanceo Baltec is a React SPA (Vite + TS + Tailwind). All content lives on a single scrollable page. The site has minimal SEO infrastructure: a title tag and a meta description — nothing else. No Open Graph, no JSON-LD, no sitemap, no robots.txt.

This plan adds all foundational SEO layers without changing the page architecture.

## File Map

### New files
| File | Purpose |
|---|---|
| `public/sitemap.xml` | Tells crawlers the canonical URL and update frequency |
| `public/robots.txt` | Crawler directives + sitemap pointer |
| `src/components/SEOHead.tsx` | Injects JSON-LD structured data via React Helmet or direct DOM script |
| `src/components/FAQ.tsx` | New FAQ accordion section with FAQPage JSON-LD |

### Modified files
| File | Change |
|---|---|
| `index.html` | Add OG tags, Twitter Card, canonical, hreflang, richer title + meta description |
| `src/App.tsx` | Import and render `SEOHead` and `FAQ` components |
| `src/components/Hero.tsx` | Improve H1 keyword density, subtitle copy |
| `src/components/Services.tsx` | Improve H2, service H3s and bullet copy with target keywords |
| `src/components/About.tsx` | Add keyword context to body copy |
| `src/components/Clients.tsx` | Add `aria-label` to section, improve H2 text |
| `src/components/Problems.tsx` | Add `aria-label` to section, enrich H3 titles |
| `src/components/Footer.tsx` | Add structured address markup via `address` element and `aria-label` |

## Implementation Order

### Substep 1 — `index.html`: head metadata overhaul
**Files:** `index.html`
**Constraint check:** No hard constraints apply. Purely additive.
**Changes:**
- Improve `<title>` to include primary keyword + location
- Rewrite `<meta name="description">` to be richer (155 chars, includes primary keyword + differentiator + CTA)
- Add `<link rel="canonical">`
- Add `<meta property="og:*">` tags (title, description, url, image, type, locale, site_name)
- Add `<meta name="twitter:*">` tags
- Add `<link rel="alternate" hreflang="es-AR">`
- Add `<meta name="geo.region" content="AR-C">` and `<meta name="geo.placename">`
- Add `<meta name="robots" content="index, follow">`
→ TEST: Build and inspect rendered HTML in browser; validate OG with ogp.me or similar

**Rollback:** Git revert on `index.html`
**Risk:** LOW

---

### Substep 2 — `public/robots.txt` + `public/sitemap.xml`
**Files:** `public/robots.txt`, `public/sitemap.xml`
**Constraint check:** None apply.
**Changes:**
- `robots.txt`: allow all, point to sitemap URL
- `sitemap.xml`: single-page site, one URL entry with `lastmod`, `changefreq: monthly`, `priority: 1.0`
→ TEST: Deploy and hit `/robots.txt`, `/sitemap.xml` in browser; validate sitemap at validator.w3.org/feed

**Rollback:** Delete the two files
**Risk:** LOW

---

### Substep 3 — `SEOHead.tsx`: JSON-LD structured data
**Files:** `src/components/SEOHead.tsx`, `src/App.tsx`
**Constraint check:** No new npm deps if we inject script tag directly into head (avoid react-helmet dep if possible).
**Changes:**
- Create component that injects `<script type="application/ld+json">` into `document.head` via `useEffect`
- Schema 1: `LocalBusiness` (subtype: `ProfessionalService`) with name, address, geo, telephone, openingHours, url, sameAs, priceRange
- Schema 2: `Organization` with logo, contactPoint
- Schema 3: `Service` list for each service (balanceo dinámico in situ, balanceo en banco, reparación de extractores, reparación de UTAs, reparación de bombas, molinos, alineación láser, análisis de vibraciones)
→ TEST: Inspect DOM for script tag in head; validate at schema.org/validator or Google Rich Results Test

**Rollback:** Remove component import from App.tsx; delete file
**Risk:** LOW — additive only, no existing code modified

---

### Substep 4 — On-page content: `Hero.tsx`
**Files:** `src/components/Hero.tsx`
**Constraint check:** Visual design must stay intact — only text content changes.
**Changes:**
- H1 line 1: inject primary keyword more explicitly (e.g. "Balanceo dinámico industrial en Buenos Aires.")
- H1 line 2: keep brand tagline or improve
- Subtitle paragraph: expand with secondary keywords (equipos rotativos, análisis de vibraciones, alineación láser)
- Stats strip: consider adding "ISO 1940" label
→ TEST: Visual regression check — screenshot before and after

**Rollback:** Revert Hero.tsx to prior text
**Risk:** LOW

---

### Substep 5 — On-page content: `Services.tsx`
**Files:** `src/components/Services.tsx`
**Constraint check:** Tab labels visible on mobile — keep short; full keyword in `long` field.
**Changes:**
- Section H2: enrich with keywords
- Each service `long` heading: include full keyword phrase (e.g. "Reparación y balanceo dinámico de extractores e inyectores de aire")
- Bullet copy: naturally incorporate: "balanceo dinámico," "equipos rotativos," "ISO 1940," "análisis de vibraciones"
- Add missing service differentiators (in-situ, sin desmonte) as bullet points where applicable
→ TEST: Visual and content review; check mobile tab labels unchanged

**Rollback:** Revert Services.tsx
**Risk:** LOW

---

### Substep 6 — On-page content: `About.tsx`, `Clients.tsx`, `Problems.tsx`
**Files:** `src/components/About.tsx`, `src/components/Clients.tsx`, `src/components/Problems.tsx`
**Constraint check:** None.
**Changes:**
- About: add keyword-rich content to body paragraphs; mention ISO 1940, CABA, specific industries served
- About section H2/H3: improve heading keyword coverage
- Clients section: add `aria-label="Clientes de Balanceo Baltec"` to section; enrich H2
- Problems section: add `aria-label`; enrich H3 titles with keywords (e.g. "Paradas de planta por vibración")
→ TEST: Content review + accessibility check

**Rollback:** Revert files
**Risk:** LOW

---

### Substep 7 — `FAQ.tsx`: new FAQ accordion + FAQPage schema
**Files:** `src/components/FAQ.tsx`, `src/App.tsx`
**Constraint check:** New component, additive. Must fit design system.
**Changes:**
- Create FAQ accordion with 8–10 questions targeting long-tail keywords and common search queries
- Questions e.g.: "¿Qué es el balanceo dinámico industrial?", "¿En qué se diferencia el balanceo in situ del balanceo en banco?", "¿Cada cuánto hay que balancear una máquina rotante?", "¿Trabajan en toda el AMBA?", "¿Qué normativas ISO aplican al balanceo dinámico?"
- Inject `FAQPage` JSON-LD alongside component
- Insert in App.tsx between About and Clients
→ TEST: Validate FAQPage schema at Google Rich Results Test; visual QA

**Rollback:** Remove from App.tsx; delete file
**Risk:** LOW

---

### Substep 8 — `Footer.tsx`: semantic address + aria-labels
**Files:** `src/components/Footer.tsx`
**Constraint check:** None.
**Changes:**
- Wrap address block in `<address>` HTML element with `itemscope itemtype="https://schema.org/PostalAddress"`
- Add `aria-label="Información de contacto"` to contact section
- Ensure phone and email are proper `<a href="tel:...">` and `<a href="mailto:...">` (already are — verify)
→ TEST: Accessibility audit

**Rollback:** Revert Footer.tsx
**Risk:** LOW

---

## Risk Tier per substep

| Substep | Risk | Reason |
|---|---|---|
| 1 — index.html metadata | LOW | Purely additive tags |
| 2 — robots.txt / sitemap | LOW | New static files only |
| 3 — SEOHead JSON-LD | LOW | Additive script injection |
| 4 — Hero content | LOW | Text-only changes |
| 5 — Services content | LOW | Text-only, tab labels checked |
| 6 — About/Clients/Problems | LOW | Text + aria attributes |
| 7 — FAQ component | LOW | New component, additive |
| 8 — Footer semantic | LOW | Additive attributes |

All substeps are LOW risk. No schema changes, no new major dependencies, no routing changes.

## Stop-and-Ask Triggers

- If `react-helmet` or any head-management library is needed (ask first — try native useEffect approach first)
- If FAQ design conflicts significantly with existing design system
- If OG image asset doesn't exist at expected path (need to create or choose one)

## Model / Thinking Recommendation

- All phases: Sonnet (standard) — mechanical SEO work, no complex logic
- FAQ content: needs careful keyword research application — Sonnet with research context sufficient
