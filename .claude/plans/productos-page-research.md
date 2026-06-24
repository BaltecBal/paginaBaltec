# Productos Page — Research Findings

## Finding R1 — Host-agnostic routing decision
**Summary:** The project ships a static SPA bundle (`dist/`). Static hosts fall into two categories: (a) those that auto-fallback to `index.html` for unknown paths (default on most modern static hosts), and (b) those that require explicit rewrite config. Since the deployment target is not declared in the repo (no deploy config files), the safest choice is one that works regardless of host.
**Source:** General knowledge of static-site deploy targets and SPA fallback behavior
**Verdict:** **Conflicts with v1's `pushState` plan.** Requires change.

**Resolution applied in v2:** Switch to **hash-based routing** (`/#/productos`) for v1 of this feature. Hash fragments are never sent to the server — the browser handles them client-side only. This works on every static host with zero server config. The URL is still shareable: `https://baltec.com.ar/#/productos`.

**Future migration:** If the user later wants prettier URLs (`/productos`), that's a separate ticket requiring the right config file for whichever host they use. Out of scope here.

## Finding R2 — Industrial product page conventions
**Summary:** Best-practice B2B industrial catalog pages use: (a) category filter pills at top, (b) 3-column responsive grid on desktop, 2 on tablet, 1 on mobile, (c) cards with image + name + short description + dual CTA (quote + chat), (d) closing CTA section linking to contact form.
**Source:** bricxlabs.com/blogs/universal-search-and-filters-ui (2026 filter patterns), srhwebagency.com/industrial-website-design-in-2026, webstacks.com/blog/industry-page-design
**Verdict:** **Confirms v1 direction.** No change needed.

## Finding R3 — Existing design system grid patterns
**Summary:** `design_system/Baltec Design System.html` uses `grid-template-columns: repeat(3, 1fr)` and `repeat(4, 1fr)` for content grids, with `gap: 24px` as a standard rhythm.
**Source:** Direct read of local file
**Verdict:** **Confirms v1's grid sizing.** v1 will mirror: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.

## Finding R4 — Existing `_redirects` is incomplete for SPA routing
**Summary:** The existing `public/_redirects` has only the webmail proxy line. It does NOT include the typical `/* /index.html 200` SPA fallback rule. This is a pre-existing issue, not specific to this feature.
**Source:** Direct read of `public/_redirects`
**Verdict:** Out of scope for this plan (pre-existing issue, not blocking the feature). Hash routing sidesteps this.

## Finding R5 — No new dependencies confirmed
**Summary:** React Router, Wouter, TanStack Router all exist but adding any of them violates the "no new deps" hard constraint. Hash-based router via ~20 lines of vanilla TS is the minimal-risk path.
**Source:** Standard knowledge of router libraries and minimal-Vite patterns
**Verdict:** **Confirms v1's "build router in-house" decision.**

## Finding R6 — Image assets available for placeholders
**Summary:** `/public/servicios/` contains `.webp` images already used by the home Services section. These can be reused as product placeholders without importing new image files.
**Source:** Direct directory listing
**Verdict:** **Confirms v1's reuse-existing-images approach.**