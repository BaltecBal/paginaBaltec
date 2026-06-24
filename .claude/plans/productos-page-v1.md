# Productos Page — v1 (Codebase-only Draft)

## Active Constraints
Hard:
- **No new dependencies** — must use existing React 18, Vite, Tailwind 3, framer-motion, lucide-react
- **No design token drift** — all colors/typography/spacing must come from `tailwind.config.js` and `src/index.css` utility classes (`.btn-*`, `.field-*`, `.display-*`, `.h1/h2/h3`, `.body*`, `.eyebrow`)
- **Reuse existing primitives** — no new base UI components (Card, Button, Modal); build with what's already in the codebase
- **Only accessible from `/productos`** — must NOT appear on the main page scroll
- **Deploy target** is Vercel SPA — routing must survive deep links (Netlify-style `_redirects` already in place)
- **WhatsApp + quote form are the only CTAs** — no prices, no buy buttons, no e-commerce

Soft:
- Prefer minimal new components (target: 1 new file + 1 small data file)
- Use existing `Header.tsx` and `Footer.tsx` unchanged
- Visual feel: navy-800 hero, white product sections, navy-900 closing CTA — match existing rhythm

Scope in:
- New route at `/productos` (rendered via lightweight client-side router)
- Categories with items (mock data only — no CMS)
- Each item shows: image, name, short description, "Consultar por WhatsApp" + "Pedir cotización" buttons
- Mobile-first responsive (≥320px, tablet, desktop, widescreen)
- SEO meta tags for `/productos` (title, description, OG image)
- Accessible (keyboard nav, alt text, focus rings on buttons, reduced-motion honored)

Scope out:
- Real product images (use existing `/public/servicios/*` placeholders or solid color tiles)
- Prices, stock, cart, checkout
- Product detail subpages
- Search/filter UX beyond category tabs
- CMS / dynamic data source
- Editing/updating products via admin UI

Stop and ask:
- Before adding any new npm package (none should be needed)
- Before changing Vite build config (rollupOptions for multi-page) — keep SPA with hash-style route as a fallback option
- Before changing `index.html` root template

Pre-existing constraints (from prior `seo-optimization-v2.md` and code):
- `index.html` has hardcoded meta tags — must update for new route via SEOHead component (existing pattern)
- Sitemap should include `/productos` after launch
- `Header` uses `#inicio` as anchor — keep current nav, add a "Productos" link

## Context

The Baltec site is currently a single-scroll 7-section landing page (Hero, Problems, Services, About, Clients, FAQ, Contact). The client now wants a dedicated `/productos` page that:

1. Shows what they sell in a catalog format
2. Drives interested buyers to either WhatsApp (quick chat) or the existing quote form
3. Is professionally designed to match the navy + accent palette already locked in

The page must feel like a natural extension — same header, same footer, same visual language — but optimized for browsing a product list rather than reading scroll narrative.

**Why now:** The previous SEO plan shipped; the natural next step is a discoverable products surface that ranks for category-specific searches and gives the sales team a cleaner shareable URL.

**Why a separate route:** Products deserve their own URL for SEO, social sharing, and direct linking from WhatsApp conversations — a scroll section inside the home page would not provide any of those.

## Reusable Patterns

| Pattern | Location | Reuse for |
|---|---|---|
| `.btn-primary` (navy fill, hover ink) | `src/index.css` | Primary "Pedir cotización" CTA |
| `.btn-light` (white ghost on dark bg) | `src/index.css` | "Consultar por WhatsApp" CTA on navy hero |
| `.btn-ghost` / `.btn-ghost-dark` | `src/index.css` | Secondary actions on light backgrounds |
| `.field-input` | `src/index.css` | Not needed here (no form on this page) |
| `.eyebrow` (uppercase mono, ink-500, tracking) | `src/index.css` | Section/category labels |
| `.display-1/2/3` (huge tight headlines) | `src/index.css` | Page H1 |
| `.h1/h2/h3` | `src/index.css` | Product card titles, category headings |
| `.body` / `.body-lg` / `.caption` | `src/index.css` | Card descriptions, helper text |
| `.bullet` | `src/index.css` | Feature bullet points inside cards |
| `.service-tab` (active = navy fill, inactive = ghost) | `src/index.css` | Category filter pills |
| `framer-motion` `whileInView` + `viewport={{ once: true }}` | used in `Services.tsx`, `About.tsx`, `Clients.tsx` | Card reveal animation |
| `useScrollAnimation` (IntersectionObserver hook) | `src/hooks/useScrollAnimation.ts` | Section reveal |
| WhatsApp link format `https://wa.me/5491535744732?text=...` | `WhatsAppFAB.tsx`, `Hero.tsx`, `Contact.tsx` | Item "WhatsApp" button (URL-encode product name) |
| Form scroll target `document.getElementById('contacto')?.scrollIntoView(...)` | `Hero.tsx`, `Services.tsx` | "Pedir cotización" → scrolls to contact form |
| `<SEOHead title description keywords ogImage />` | `src/components/SEOHead.tsx` | Per-route meta |
| Container `max-w-[1320px] mx-auto px-6 md:px-10` | every section | All products page sections |
| Section spacing `py-12 md:py-24` | every section | Page hero + category sections |

## File Map

### New files
| File | Purpose |
|---|---|
| `src/data/products.ts` | Mock product catalog: array of categories, each with id/name + items array (id, name, shortDesc, image, features[]) |
| `src/components/Productos.tsx` | The `/productos` page component: hero, category filter, grid of cards, closing CTA. Self-contained — uses existing primitives only. |
| `src/lib/router.ts` | Tiny hash-based router (single regex, listens to `popstate` and intercepts `<a>` clicks). ~30 lines. Avoids adding react-router dep. |

### Modified files
| File | Change |
|---|---|
| `src/App.tsx` | Render `<Productos />` when pathname === `/productos`, else render existing main page |
| `src/components/Header.tsx` | Add "Productos" nav link that points to `/productos` (preserves existing nav, marks itself active when on that route) |
| `public/sitemap.xml` | Add `<url><loc>https://baltec.com.ar/productos</loc></url>` after the home url |
| `public/robots.txt` | No change — `/productos` should be indexable |
| `index.html` | Update `<title>` to default to home; Productos route will override via SEOHead (matches existing pattern) |

### Not changed
- `src/components/Footer.tsx` — already renders globally, will appear on `/productos` automatically
- `src/components/WhatsAppFAB.tsx` — already global
- `src/index.css` — no new utility classes needed (verify in red phase)

## Implementation Order

### Step 1 — Create data layer
- **File:** `src/data/products.ts`
- **Action:** Define `Product` and `Category` types, export `categories: Category[]` with 3-4 categories and ~3-4 items each (12 mock items total — keeps the page scannable)
- **Images:** Use existing `/public/servicios/*.webp` files (already in repo) as placeholders, mapped via category
- **Constraint check:** No deps. No new design tokens. Reuses existing image assets.
- **→ TEST:** `npm run build` still passes (TypeScript compile)

### Step 2 — Create lightweight router
- **File:** `src/lib/router.ts`
- **Action:** Export `useRoute()` hook returning current path; export `navigate(path)` helper that uses `history.pushState` + dispatches a `popstate` event. Add global click interceptor on links with `data-route` attribute.
- **Why hash-free:** Vercel serves SPA via existing `_redirects` rule, so `pushState` works without server changes
- **Constraint check:** Zero deps. < 50 LOC.
- **→ TEST:** Manual: navigate to `/productos` directly, refresh page — should still work because Vercel falls back to `index.html`

### Step 3 — Build Productos component
- **File:** `src/components/Productos.tsx`
- **Subcomponents in same file (private):** `CategoryPills`, `ProductCard`, `Hero`, `ClosingCTA`
- **Section 1 — Hero (navy-800 bg, same as home hero accent):**
  - `.eyebrow` label: "Catálogo"
  - `.display-1` H1: "Equipos y suministros industriales"
  - `.body-lg` subtitle in ink-200
  - `.btn-light` "Hablar por WhatsApp" → wa.me link
  - `.btn-ghost` (white ghost on dark) "Ir al formulario" → scrolls to #contacto
- **Section 2 — Category filter + grid:**
  - `.eyebrow` "Categorías"
  - `<CategoryPills>` — pill row using `.service-tab` pattern, default "Todas" selected, click filters grid
  - Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` — cards stack on mobile, 4-up on widescreen
  - `<ProductCard>` — image at top (aspect-[4/3], object-cover), `.h3` name, `.caption` shortDesc, optional `.bullet` features list, two CTAs side-by-side at bottom
  - Card hover: subtle lift (translate-y-[-2px]) + shadow elevation, 200ms ease
- **Section 3 — Closing CTA (navy-900 bg, mirrors home's Contact section opener):**
  - `.eyebrow` "¿Necesita algo específico?"
  - `.display-2` "Asesórese con nuestro equipo técnico"
  - `.body-lg` subtitle
  - `.btn-light` "Hablar por WhatsApp" + `.btn-ghost` "Pedir cotización"
- **Animation:** `whileInView` with `viewport={{ once: true }}` on cards, staggered by `index * 0.05`
- **A11y:** Cards are `<article>` with `<h3>`; CTA buttons have aria-labels including product name; images have descriptive `alt`; respect `prefers-reduced-motion`
- **Constraint check:** All classes from existing utility set. Image alt text mandatory.
- **→ TEST:** Visual check at 320px, 375px, 768px, 1024px, 1440px widths. Lighthouse a11y ≥ 95.

### Step 4 — Wire router into App
- **File:** `src/App.tsx`
- **Action:** Read `window.location.pathname`; if `/productos`, render `<Productos />`; else render the existing main page
- **SEOHead** integration: pass route-appropriate title/description for `/productos`
- **Constraint check:** No regression to home page scroll behavior
- **→ TEST:** Click "Inicio" in header → returns to home; click "Productos" → goes to catalog. Refresh on `/productos` → still loads.

### Step 5 — Update Header
- **File:** `src/components/Header.tsx`
- **Action:** Add "Productos" item between "Servicios" and "Nosotros" in nav array. Use `<Link>`-style `<a>` with `data-route="/productos"`. Highlight active when path matches.
- **Constraint check:** Existing nav links (anchor scrolls) keep working
- **→ TEST:** Navigate from home → /productos → home, header active state toggles correctly

### Step 6 — SEO + sitemap
- **Files:** `public/sitemap.xml`, plus SEO meta inside `Productos.tsx` via `<SEOHead />`
- **Action:** Add `<url><loc>https://baltec.com.ar/productos</loc>...</url>` to sitemap. SEOHead with title "Productos | Baltec — Equipos y Suministros Industriales", description matching services.
- **Constraint check:** Sitemap valid XML
- **→ TEST:** Validate sitemap at xml-sitemaps.com/validator

### Step 7 — Build verification
- **Action:** `npm run build` + serve `dist/` + click through entire flow
- **Constraint check:** No TypeScript errors, no console warnings, no broken images
- **→ TEST:** Lighthouse mobile score ≥ 90, a11y ≥ 95

## Risk Tier per substep
- Step 1 (data): **LOW** — pure TS file
- Step 2 (router): **MED** — touches URL behavior; needs popstate + click handling correctness
- Step 3 (Productos): **LOW-MED** — largest surface, but constrained to existing primitives
- Step 4 (App wire): **MED** — gate between routes; if broken, both pages break
- Step 5 (Header): **LOW** — additive
- Step 6 (SEO): **LOW** — additive
- Step 7 (verify): **LOW** — verification only

Overall risk: **MED** — single-page app gaining its first sub-route is a one-time architectural addition.

## Stop-and-Ask Triggers

Halt and ask the user before:
- Adding ANY npm package (router is built in-house on purpose)
- Changing Vite `rollupOptions.input` or build config
- Modifying `index.html` `<title>` permanently
- Removing or renaming existing nav items in Header
- Replacing any existing component (`Header`, `Footer`, `WhatsAppFAB`) with new versions
- Using any color/spacing/font that isn't already in the design system

## Model / Thinking Recommendation

- Steps 1, 5, 6, 7: lighter model is fine — mechanical work, well-defined
- Steps 2, 3, 4: medium-to-strong model recommended — router logic + the page itself carry visual judgment calls and a11y considerations that benefit from careful reasoning

## Open Questions

1. **Real images?** User said "mock up" — I'll use existing `/public/servicios/*` as placeholders. Confirm acceptable, or want solid-color tiles?
2. **Category list:** I'll propose 3-4 categories (e.g., "Instrumental", "Equipos de medición", "Insumos", "Repuestos"). User should confirm or replace with their real taxonomy.
3. **CTA copy:** "Consultar por WhatsApp" vs. "Hablar por WhatsApp" — pick one. I'll default to "Hablar por WhatsApp" matching home hero.
4. **Number of items per category:** I'll target 3-4 to keep grid balanced (~12 total). User can adjust.