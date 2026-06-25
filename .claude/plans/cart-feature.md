# Cart Feature — Plan

## Spec (from user)

- Single "Agregar al carrito" button per product (replaces the current WhatsApp + Cotizar pair)
- Cart state persists in `localStorage` ("cache"), shared across all routes/pages
- Cart icon in the header with count badge (always visible, badge shows only when count > 0)
- Right-side sidebar opens from cart icon click OR banner click:
  - Lists items with name, marca (internal), quantity stepper (+/−), remove button
  - Sticky "Consultar" CTA at the bottom of the sidebar → opens **Ventas** WhatsApp (`5491149797144`)
- Slim bottom banner appears when cart has **more than 2 items** (count > 2):
  - Desktop: "Agregaste items a tu carrito [Consultar]"
  - Mobile: "Agregaste items [Consultar]"
  - Whole banner is one clickable region → opens sidebar (does NOT directly open WhatsApp)
  - Banner is dismissible (close icon)
  - Slim one-liner, takes minimal vertical space
- All touch targets ≥ 44px on mobile, readable typography
- WhatsApp Cart link goes to **Ventas** (`5491149797144`), not Administración

## Scope

### In scope
- New cart context with localStorage persistence
- Replace 2-button card CTA with 1 "Agregar" button (home, index, category)
- Cart icon in header (desktop + mobile menus)
- Sidebar panel (desktop slide-in, mobile full-screen)
- Bottom banner (count > 2)
- Cart item quantity stepper, remove button
- Sidebar Consultar CTA → Ventas WhatsApp with pre-filled message listing items

### Out of scope (per user)
- No prices
- No buying/checkout flow
- No multi-cart, no saved carts, no accounts
- Cart is browser-local only ("cache")

## File map

### New files
| File | Purpose |
|---|---|
| `src/lib/cart.tsx` | `CartProvider`, `useCart()` hook, `CartItem` type, localStorage sync |
| `src/components/CartIcon.tsx` | Header cart icon + count badge |
| `src/components/CartSidebar.tsx` | Right-side panel: items list, quantity stepper, remove, Consultar CTA |
| `src/components/CartBanner.tsx` | Bottom slim banner (count > 2 only) |

### Modified files
| File | Change |
|---|---|
| `src/App.tsx` | Wrap with `<CartProvider>`, render `<CartSidebar>` + `<CartBanner>` globally |
| `src/components/Header.tsx` | Add `<CartIcon>` between nav items and Presupuesto button; mobile menu gets cart link too |
| `src/components/Productos.tsx` | Replace `<ProductCard>` 2-button row with single "Agregar al carrito" button |
| `src/components/ProductosCategory.tsx` | Same |

## Design (decisions)

### Cart state shape
```ts
type CartItem = {
  id: string;           // product.id
  name: string;
  shortDesc: string;
  quantity: number;
  addedAt: number;      // timestamp for stable sort
};
// Context API: { items, add(id), remove(id), setQuantity(id, n), clear(), isOpen, open(), close(), toggle() }
```

### Cart icon in header
- Sits **right before** the Presupuesto button (so it's visible alongside the other nav-level actions)
- Icon: `ShoppingCart` from lucide-react (already in deps)
- Badge: small accent circle with count, top-right of icon
- Hidden badge if count = 0 (clean look for first-time visitors)
- Active state when sidebar is open

### Product card CTA (replaces the 2 buttons)
- Single full-width button "Agregar al carrito" with `Plus` icon
- On click: adds item to cart (quantity 1), shows a tiny inline confirmation (icon swaps to checkmark for ~1.5s, then back)
- Touch target 44px+ on mobile (full width)
- After add: small toast/subtle feedback so user knows it worked (NOT a full toast — keep it inline on the button)

### Cart sidebar
- Desktop: 380px wide, slides in from right, dark backdrop
- Mobile: full-screen overlay, slide-in from right
- Header: "Tu carrito" + close X
- Body: scrollable list of items (each: name, shortDesc, qty stepper, remove X)
- Empty state: "Tu carrito está vacío" + hint "Agregá productos desde el catálogo"
- Footer: sticky at bottom, "Consultar por WhatsApp" button → ventas
- Escape key closes
- Click outside (on backdrop) closes
- Body scroll locked when open

### Cart item row
- Name (h3, navy-900)
- Short description (caption, ink-500, 1 line clamp)
- Quantity: `− [n] +` stepper, min 1, max 99
- Remove: trash icon button (X with hover state)
- Touch targets: stepper buttons ≥ 40px square, remove button ≥ 40px square

### Bottom banner
- Fixed at bottom of viewport, full width, slim ~52px tall
- Navy-900 background, white text
- Click anywhere → opens sidebar (NOT WhatsApp — user clicks "Consultar" inside the sidebar to send)
- Right side: small X to dismiss (per session)
- Slides up when count goes 1 → 3, slides down when count goes 3 → ≤2

### WhatsApp message (Consultar)
```
Hola, me gustaría consultar por los siguientes productos:
- Bornera BCR 3 (x2)
- Capacitor 1.5 µF — 400 V (x1)
- Turbina 160×100 DER (x1)

Total: 4 unidades.
```
→ opens `https://wa.me/5491149797144?text=...`

## Implementation order

1. **`src/lib/cart.tsx`** — Cart context, useCart hook, localStorage persistence
2. **`src/components/CartIcon.tsx`** — Header icon + badge (depends on #1)
3. **`src/components/CartSidebar.tsx`** — Slide-in panel (depends on #1)
4. **`src/components/CartBanner.tsx`** — Bottom banner (depends on #1)
5. **`src/App.tsx`** — Wire provider + render sidebar/banner globally
6. **`src/components/Header.tsx`** — Add CartIcon
7. **`src/components/Productos.tsx` + `ProductosCategory.tsx`** — Replace 2-button CTA with "Agregar al carrito"

## Constraints (locked from existing project)

- Hard: no new dependencies
- Hard: reuse existing tokens (navy-800, accent, whatsapp green for CTA hover if needed)
- Hard: WhatsApp number for cart = `5491149797144` (Ventas), not the admin number
- Soft: prefer minimal new components — 4 new files is the floor
- Touch targets ≥ 44px on mobile (user explicit)
- Banner is a clickable region but does NOT open WhatsApp directly — opens the sidebar (so user reviews before sending)

## Risk
- **LOW** overall. No schema, no auth, no server. State lives in localStorage + React context.
- Only edge case: SSR safety — localStorage access must be guarded (the project is Vite SPA, but `useEffect` for the initial load is safer than reading in initial state).

## Open questions for user

(None — spec is clear enough to execute. I'll make the small UX calls described above and call them out in the final report.)