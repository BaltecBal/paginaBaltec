# Productos Page — v1 (Codebase-only Draft)

## Active Constraints
Hard:
- **No new dependencies** — must use existing React 18, Vite, Tailwind 3, framer-motion, lucide-react
- **No design token drift** — all colors/typography/spacing must come from `tailwind.config.js` and `src/index.css` utility classes (`.btn-*`, `.field-*`, `.display-*`, `.h1/h2/h3`, `.body*`, `.eyebrow`)
- **Reuse existing primitives** — no new base UI components (Card, Button, Modal); build with what's already in the codebase
- **Only accessible from `/#/productos`** — must NOT appear on the main page scroll
- **Hash-based routing** (per Finding R1) — works on any static host without server config
- **WhatsApp + quote form are the only CTAs** — no prices, no buy buttons, no e-commerce

Soft:
- Prefer minimal new components (target: 1 new file + 1 small data file)
- Use existing `Header.tsx` and `Footer.tsx` unchanged
- Visual feel: navy-800 hero, white product sections, navy-900 closing CTA — match existing rhythm

Scope in:
- New route at `/#/productos` (hash-based client-side router — works on any static host with no server config)
- Categories with items (mock data only — no CMS)
- Each item shows: image, name, short description, "Consultar por WhatsApp" + "Pedir cotización" buttons
- Mobile-first responsive (≥320px, tablet, desktop, widescreen)
- SEO meta tags for `/productos` view (title, description, OG image) — search engines will see the home page meta on the initial load, but the URL fragment is shareable
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
- Before changing Vite build config
- Before changing `index.html` root template
- Before later migrating from hash routing to clean URLs (would require a host-specific config file)

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
| `src/lib/router.ts` | Tiny hash-based router (~25 lines): `useHashRoute()` hook, `navigate(path)` helper. Listens to `hashchange` and provides click interception for `data-route` links. Zero deps. |

### Modified files
| File | Change |
|---|---|
| `src/App.tsx` | Read `window.location.hash`; if `#/productos`, render `<Productos />`; else render existing main page. Use the `useHashRoute()` hook from `src/lib/router.ts` |
| `src/components/Header.tsx` | Add "Productos" nav link that points to `#/productos` (preserves existing anchor nav, marks itself active when on that route) |
| `public/sitemap.xml` | Add `<url><loc>https://baltec.com.ar/#/productos</loc></url>` after the home url |
| `public/robots.txt` | No change — `/productos` is indexable (fragment stripped by crawlers is fine; URL still resolves to home meta) |
| `index.html` | No change — home title remains default |

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

### Step 2 — Create lightweight hash router
- **File:** `src/lib/router.ts`
- **Action:** Export `useHashRoute()` hook that subscribes to `hashchange` events and returns the current route (e.g. `"/productos"` or `null`). Export `navigate(path)` helper that calls `window.location.hash = path`. Add global click interceptor on links with `data-route="<hash-path>"` attribute — intercepts, calls `navigate`, prevents default.
- **Why hash (changed from v1):** Per Finding R1, the project's deploy target isn't declared in the repo, so the safest routing choice is one that works regardless of host. Hash routing avoids any server config requirement.
- **URL appearance:** Browser address bar shows `https://baltec.com.ar/#/productos` — clean enough for WhatsApp sharing, and copy/paste preserves the route.
- **Constraint check:** Zero deps. < 30 LOC. No server config touched.
- **→ TEST:** Manual: click "Productos" header link → URL becomes `/#/productos`, page swaps to Productos component. Refresh → still works (hash is never sent to server). Browser back/forward → swaps correctly.

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
- **Action:** Use `useHashRoute()` hook. If returns `"/productos"`, render `<Productos />`; else render the existing main page
- **SEOHead** integration: Productos component calls `<SEOHead title="Productos | Baltec..." description="..." />` when it mounts
- **Constraint check:** No regression to home page scroll behavior. Both Header and Footer render globally so they appear on both pages.
- **→ TEST:** Click "Inicio" in header (or the home logo) → navigates to `#inicio` and home page renders. Click "Productos" → goes to `/#/productos`. Browser back → home. Refresh on `/#/productos` → still loads Productos component.

### Step 5 — Update Header
- **File:** `src/components/Header.tsx`
- **Action:** Add "Productos" item between "Servicios" and "Nosotros" in nav array. Use `<a href="#/productos" data-route="/productos">`. Highlight active when `useHashRoute()` returns `"/productos"`. Update existing nav links to clear the hash (e.g. `href="#inicio"` should also navigate to `/#` first to avoid hash collision — but existing `href="#inicio"` already works because `hashchange` fires for fragment-only changes within the same hash too).
- **Constraint check:** Existing anchor-scroll nav links must still scroll to sections when user is on the home page
- **→ TEST:** Navigate from home → `/#/productos` → home, header active state toggles correctly. From `/#/productos`, clicking "Inicio" returns to home (existing `#inicio` anchor still works).

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
- Step 2 (router): **LOW** — hash-based, no server dependency; simpler than pushState
- Step 3 (Productos): **LOW-MED** — largest surface, but constrained to existing primitives
- Step 4 (App wire): **LOW** — gate between routes; hash-based is well-tested pattern
- Step 5 (Header): **LOW** — additive; existing anchor nav unchanged
- Step 6 (SEO): **LOW** — additive
- Step 7 (verify): **LOW** — verification only

Overall risk: **LOW-MED** — well-isolated feature, no server config touched.

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
- Steps 2, 3, 4: medium-to-strong model recommended — page layout and a11y considerations benefit from careful reasoning

## Open Questions

1. **Real images?** User said "mock up" — I'll use existing `/public/servicios/*` as placeholders. Confirm acceptable, or want solid-color tiles?
2. **Category list:** I'll propose 3-4 categories (e.g., "Instrumental", "Equipos de medición", "Insumos", "Repuestos"). User should confirm or replace with their real taxonomy.
3. **CTA copy:** "Hablar por WhatsApp" (matching home hero) — confirm.
4. **Number of items per category:** I'll target 3-4 to keep grid balanced (~12 total). User can adjust.
5. **URL choice:** OK to ship as `/#/productos` (hash), or do you want to add a host-specific rewrite config so the URL is `/productos`? Hash is faster and zero-config.

## Changelog from v1

| Section | Change | Triggered by |
|---|---|---|
| Active Constraints — routing | Hash-based (`/#/productos`) instead of pushState (`/productos`) | Finding R1 |
| Scope in — routing | `/#/productos` instead of `/productos`; SEO note updated | Finding R1 |
| Stop and ask | Added: "Before later migrating from hash routing to clean URLs" | Finding R1 |
| File Map — New files | Router file description updated to hash-based | Finding R1 |
| File Map — Modified files | All references to `pathname` changed to `hash`; sitemap url uses `#/productos` | Finding R1 |
| Step 2 (router) | Rewritten with hash-based approach + reasoning | Finding R1 |
| Step 4 (App wire) | Uses `useHashRoute()` instead of `pathname` check | Finding R1 |
| Step 5 (Header) | Updated to use `href="#/productos"` and existing anchor nav note | Finding R1 |
| Risk Tier | Router risk downgraded from MED to LOW | Finding R1 |