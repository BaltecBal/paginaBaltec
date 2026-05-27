# SEO Optimization — Balanceo Baltec

_Version: v2 — research-validated executable plan. 2026-05-27._

## Active Constraints

```
Hard:      none — full latitude for best SEO outcome
Soft:      visual design must stay intact (text/metadata changes only in most substeps)
           defer blog, case study pages, downloadable assets to later plan
Scope in:  technical SEO (meta, OG, JSON-LD, sitemap, robots.txt)
           on-page content optimization (keywords, headings, body copy)
           FAQ section (new component with FAQPage schema)
Scope out: blog section, case study pages, whitepaper/downloads
           SSR/SSG migration
           backlink outreach (separate plan)
Stop if:   (none declared)
```

## Context

Baltec is a React SPA (Vite + TS + Tailwind). One scrollable page, 7 sections. Current SEO: a title tag + meta description. Nothing else.

**Competitive context (research-validated):** Every Argentine industrial balancing competitor lacks meta descriptions and schema markup. This plan gives Baltec a structural SEO advantage that competitors cannot copy without significant effort. The biggest quick wins are: structured data (zero competition), meta description (zero competition), and geo-keyword content targeting CABA/AMBA zones (unclaimed by any competitor).

## Reusable Patterns

| Pattern | Location | Reuse for |
|---|---|---|
| `useEffect` DOM injection | Contact.tsx (emailjs init) | SEOHead JSON-LD script injection |
| Section `id` anchors | All sections | Schema `url` fragment references |
| Existing `<address>` content | Footer.tsx | Wrap in semantic `<address>` element |

## File Map

### New files
| File | Purpose |
|---|---|
| `public/sitemap.xml` | Canonical URL + crawl frequency for single-page site |
| `public/robots.txt` | Crawler directives + sitemap pointer |
| `src/components/SEOHead.tsx` | JSON-LD injection: LocalBusiness + Organization + 7× Service schemas |
| `src/components/FAQ.tsx` | FAQ accordion + FAQPage JSON-LD; 10 questions |

### Modified files
| File | Change |
|---|---|
| `index.html` | Title, meta desc, OG, Twitter Card, canonical, hreflang, geo meta, robots meta |
| `src/App.tsx` | Import + render SEOHead and FAQ components |
| `src/components/Hero.tsx` | H1 + subtitle copy with primary + secondary keywords; geo modifier |
| `src/components/Services.tsx` | H2, service H3 headings (full keyword form), bullet copy enrichment |
| `src/components/About.tsx` | Body copy: ISO 21940, CABA, specific industries, 40-year differentiation |
| `src/components/Clients.tsx` | `aria-label` on section; H2 improvement |
| `src/components/Problems.tsx` | `aria-label` on section; H3 titles with keyword context |
| `src/components/Footer.tsx` | Semantic `<address>` wrapper; `aria-label` on contact block |

---

## Implementation Order

### Substep 1 — `index.html`: complete head overhaul
**Files:** `index.html`
**Constraint check:** Additive only. No visual impact.

**Exact changes:**

**`<title>`** (research finding F7):
```
Balanceo Dinámico Industrial · Reparación de Equipos Rotativos · Baltec Buenos Aires
```

**`<meta name="description">`** (research findings F1, F4, F5):
```
Especialistas en balanceo dinámico industrial en CABA y AMBA. Reparación de bombas, extractores, UTAs y molinos. Alineación láser. +40 años. Contactenos.
```
(~155 chars)

**Add — Open Graph block:**
```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_AR" />
<meta property="og:site_name" content="Balanceo Baltec" />
<meta property="og:title" content="Balanceo Dinámico Industrial · Baltec Buenos Aires" />
<meta property="og:description" content="Especialistas en balanceo dinámico industrial en CABA y AMBA. Reparación de equipos rotativos, alineación láser, análisis de vibraciones. +40 años de experiencia." />
<meta property="og:url" content="https://www.balanceobaltec.com/" />
<meta property="og:image" content="https://www.balanceobaltec.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Balanceo Dinámico Industrial Baltec — Buenos Aires" />
```

**Add — Twitter Card:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Balanceo Dinámico Industrial · Baltec Buenos Aires" />
<meta name="twitter:description" content="Especialistas en balanceo dinámico industrial en CABA y AMBA. +40 años." />
<meta name="twitter:image" content="https://www.balanceobaltec.com/og-image.jpg" />
```

**Add — canonical + hreflang:**
```html
<link rel="canonical" href="https://www.balanceobaltec.com/" />
<link rel="alternate" hreflang="es-AR" href="https://www.balanceobaltec.com/" />
<link rel="alternate" hreflang="es" href="https://www.balanceobaltec.com/" />
```

**Add — geo + robots meta:**
```html
<meta name="robots" content="index, follow" />
<meta name="geo.region" content="AR-C" />
<meta name="geo.placename" content="Buenos Aires, Argentina" />
<meta name="geo.position" content="-34.6542928;-58.4197444" />
<meta name="ICBM" content="-34.6542928, -58.4197444" />
```

**Note on OG image:** Need to create `/public/og-image.jpg` (1200×630px). Can use a screenshot of the hero section with Baltec logo overlay, or create a simple branded card. Flag if asset doesn't exist — see Stop-and-Ask below.

→ **TEST:** Build dev server; inspect `<head>` in browser devtools. Test OG preview at https://opengraph.xyz. Validate hreflang with Google Search Console after deploy.

**Rollback:** `git revert` on `index.html`
**Risk:** LOW

---

### Substep 2 — `public/robots.txt` + `public/sitemap.xml`
**Files:** `public/robots.txt`, `public/sitemap.xml`
**Constraint check:** None.

**`robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://www.balanceobaltec.com/sitemap.xml
```

**`sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.balanceobaltec.com/</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

→ **TEST:** Hit `/robots.txt` and `/sitemap.xml` in browser after build; validate sitemap at https://www.xml-sitemaps.com/validate-xml-sitemap.html

**Rollback:** Delete both files
**Risk:** LOW

---

### Substep 3 — `SEOHead.tsx`: JSON-LD structured data
**Files:** `src/components/SEOHead.tsx`, `src/App.tsx`
**Constraint check:** No new npm deps — use `useEffect` + direct `document.head` injection. No react-helmet needed.

**Schema 1 — LocalBusiness (research findings F2, F4, F8):**
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Balanceo Dinámico Baltec SRL",
  "alternateName": "Baltec",
  "description": "Especialistas en balanceo dinámico industrial en banco e in situ, reparación de equipos rotativos, alineación láser y análisis de vibraciones en CABA y AMBA. Más de 40 años de experiencia.",
  "url": "https://www.balanceobaltec.com/",
  "logo": "https://www.balanceobaltec.com/baltec.png",
  "image": "https://www.balanceobaltec.com/og-image.jpg",
  "telephone": "+541149199922",
  "email": "info@balanceobaltec.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Del Barco Centenera 3405",
    "addressLocality": "Nueva Pompeya, Buenos Aires",
    "addressRegion": "CABA",
    "postalCode": "C1437",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -34.6542928,
    "longitude": -58.4197444
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "12:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "13:00",
      "closes": "17:00"
    }
  ],
  "foundingDate": "1985",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": -34.6542928,
      "longitude": -58.4197444
    },
    "geoRadius": "100000"
  },
  "sameAs": [
    "https://www.linkedin.com/company/balanceo-baltec",
    "https://www.google.com/maps/place/Balanceo+Din%C3%A1mico+Baltec+SRL"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Balanceo y Reparación Industrial",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Balanceo dinámico industrial en banco" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Balanceo dinámico in situ" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación de extractores e inyectores de aire" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación y balanceo de UTAs" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación de bombas de agua y centrífugas" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación de molinos industriales" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alineación láser de ejes y acoplamientos" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Análisis y medición de vibraciones mecánicas" }}
    ]
  }
}
```

**Schema 2 — Organization** (name, logo, contactPoint — supports Knowledge Panel):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Balanceo Dinámico Baltec SRL",
  "url": "https://www.balanceobaltec.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.balanceobaltec.com/baltec.png"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+541149199922",
    "contactType": "customer service",
    "contactOption": "TollFree",
    "areaServed": "AR",
    "availableLanguage": "Spanish"
  }
}
```

Both schemas injected as two separate `<script type="application/ld+json">` tags via `useEffect`.

→ **TEST:** Google Rich Results Test at https://search.google.com/test/rich-results; Schema.org validator at https://validator.schema.org/

**Rollback:** Remove `<SEOHead />` from App.tsx; delete file
**Risk:** LOW

---

### Substep 4 — `Hero.tsx`: H1 + subtitle keyword enrichment
**Files:** `src/components/Hero.tsx`
**Constraint check:** Visual design intact — font sizes, layout unchanged. Only text content changes.

**H1 line 1** (currently: "Balanceo dinámico industrial."):
```
Balanceo dinámico industrial en Buenos Aires.
```
_(adds geo modifier — research finding F4)_

**H1 line 2** (currently: "Precisión en cada rotación."):
Keep — brand tagline, not SEO-critical; changing risks brand identity.

**Subtitle paragraph** (currently: "Balanceo de máquinas rotantes para industria, todo tipo de piezas rotantes."):
```
Balanceo dinámico en banco e in situ, reparación de equipos rotativos, alineación láser y análisis de vibraciones. Servicio en CABA y AMBA.
```
_(research findings F5, F4, F3)_

**Stats strip** — keep as-is (ISO is already there). Consider changing "ISO" label to "ISO 21940" for specificity (finding F8) — low priority, fits character limit.

→ **TEST:** Screenshot before/after; verify mobile wrap looks right.

**Rollback:** Revert Hero.tsx
**Risk:** LOW

---

### Substep 5 — `Services.tsx`: headings + bullet copy
**Files:** `src/components/Services.tsx`
**Constraint check:** `short` / `mobile` tab labels must stay short — do not change those. Only `long` headings and `bullets` change.

**Section H2** (currently: "Soluciones de alta calidad para sus equipos."):
```
Servicios de balanceo dinámico y reparación de equipos rotativos.
```

**Service 01 — `long` heading** (currently: "Reparación de extractores e inyectores de aire"):
```
Reparación y balanceo dinámico de extractores e inyectores de aire
```

**Service 01 — bullets** (add/replace):
- Keep existing bullets
- Add: "Balanceo dinámico in situ según norma ISO 21940"
- Add: "Análisis de vibraciones antes y después del servicio"

**Service 02 — `long` heading** (currently: "Reparación de UTA · Unidades de Tratamiento de Aire"):
```
Reparación y balanceo dinámico de UTAs — Unidades de Tratamiento de Aire
```
_(research finding F6 — full keyword form)_

**Service 02 — bullets:**
- Keep existing
- Reinforce: "Balanceo dinámico INSITU según normas ISO 21940" (replace current "Balanceo dinámico INSITU y control de vibración final")

**Service 03 — `long` heading** (currently: "Reparación de bombas de agua"):
```
Reparación y balanceo dinámico de bombas centrífugas y electrobombas
```

**Service 04 — `long` heading** (currently: "Reparación de molinos industriales"):
```
Reparación y balanceo dinámico de molinos industriales
```

**Service 05 — `long` heading** (currently: "Alineación láser de maquinaria"):
```
Alineación láser de ejes y acoplamientos industriales
```

**CTA banner** (currently: "¿Trabaja con otro tipo de maquinaria?"):
```
¿Necesita balanceo dinámico o reparación de otro equipo rotante?
```
_(keyword enrichment of CTA)_

→ **TEST:** Visual QA all 5 tabs; verify mobile labels unchanged; verify no text overflow.

**Rollback:** Revert Services.tsx
**Risk:** LOW

---

### Substep 6 — `About.tsx`: ISO + CABA + client industry keywords
**Files:** `src/components/About.tsx`
**Constraint check:** None.

**H2** (currently: "40 años de oficio."):
```
40 años de oficio en balanceo dinámico industrial.
```

**Body paragraph 1** — add ISO and service type:
```
Los comienzos de Baltec fueron en 1985 en Lanús, Buenos Aires, bajo el nombre Fantasía De Paryam. Desde entonces, nos dedicamos exclusivamente al balanceo dinámico en taller e insitu de equipos rotativos industriales.
```

**Body paragraph 2** — add service scope + CABA:
```
En 2002 adoptamos el nombre Baltec, expandiendo nuestros servicios a reparaciones mecánicas integrales de bombas, extractores, UTAs y molinos industriales. Con taller en CABA, atendemos clientes en todo el AMBA.
```

**"Nuestro Objetivo" H3** — keep text, add keyword anchor to section:
Add `id="nosotros-objetivo"` to that subsection for schema URL reference.

**Body paragraph under Nuestro Objetivo** — add ISO reference (finding F8):
```
Lo principal es satisfacer a nuestros clientes, brindando garantía de nuestro trabajo. Todos los balanceos se realizan bajo normas ISO 21940 (ex ISO 1940-1) y tolerancias mecánicas estrictas.
```

→ **TEST:** Content review; mobile layout check.

**Rollback:** Revert About.tsx
**Risk:** LOW

---

### Substep 7 — `Clients.tsx`, `Problems.tsx`: aria + keyword enrich
**Files:** `src/components/Clients.tsx`, `src/components/Problems.tsx`

**Clients.tsx:**
- Add `aria-label="Clientes de Balanceo Baltec SRL"` to `<section>`
- H2 (currently: "Confianza de empresas líderes."):
  ```
  Confianza de empresas líderes en Argentina.
  ```
- Body text already good — add industry context:
  ```
  Más de 40 años trabajando con referentes de la industria metalúrgica, farmacéutica, banca, alimentación y telecomunicaciones en Argentina.
  ```
  _(Acindar=metalúrgica, Asofarma=farmacéutica, Coto=alimentación, Telecom=telecomunicaciones, BNA=banca)_

**Problems.tsx:**
- Add `aria-label="Problemas que resolvemos"` to `<section>`
- Enrich H3 titles with keyword context:
  - "Paradas de planta" → "Paradas de planta por vibración o desequilibrio"
  - "Fallas repetitivas" → "Fallas repetitivas en equipos rotativos"
  - "Desgaste prematuro" → "Desgaste prematuro de rodamientos y ejes"
  - "Pérdida de eficiencia" → "Pérdida de eficiencia por vibraciones mecánicas"

→ **TEST:** Visual and content review.

**Rollback:** Revert both files
**Risk:** LOW

---

### Substep 8 — `FAQ.tsx`: new FAQ section + FAQPage schema
**Files:** `src/components/FAQ.tsx`, `src/App.tsx`
**Constraint check:** New component — must match design system (navy, ink colors, border styles).

**Placement in App.tsx:** Between `<About />` and `<Clients />`

**10 FAQ questions** (research findings F2, F4, F6, F8, F9):

1. **¿Qué es el balanceo dinámico industrial?**
   Explica desequilibrio de masas, consecuencias (vibración, desgaste, ruido), y cómo el balanceo dinámico lo corrige. Menciona ISO 21940.

2. **¿En qué se diferencia el balanceo en banco del balanceo in situ?**
   Banco = equipo traído al taller, mayor precisión. In situ = sin desmontaje, en planta, menor tiempo de parada. Baltec hace ambos.

3. **¿Qué equipos pueden balancearse?**
   Ventiladores centrifugos y axiales, extractores, inyectores, UTAs, bombas centrífugas, electrobombas, molinos, compresores, generadores, turbinas, agitadores industriales.

4. **¿Qué es la alineación láser y por qué es importante?**
   Alineación con tecnología láser de alta precisión entre ejes y acoplamientos. Reduce desgaste, vibración y consumo energético. Complementa el balanceo dinámico.

5. **¿Cada cuánto hay que balancear una máquina rotante?**
   Depende de las condiciones de operación. Recomendado con cada reparación mayor o cuando aparecen síntomas (vibración, ruido, calor en rodamientos). El análisis de vibraciones ayuda a determinar la frecuencia óptima.

6. **¿Bajo qué norma trabajan?**
   ISO 21940 (ex ISO 1940-1): norma internacional para tolerancias de balanceo de rotores rígidos. También se aplican tolerancias ISO 10816 para niveles de vibración en máquinas.

7. **¿Realizan trabajos en toda el AMBA?**
   Sí. Taller en Nueva Pompeya, CABA. Servicio in situ en toda el Área Metropolitana de Buenos Aires: zonas norte (Pilar, Tigre, Malvinas Argentinas), oeste (Luján, Moreno, La Matanza), sur (Avellaneda, Lanús, Quilmes, Berazategui) y corredor industrial Zárate-Campana.

8. **¿Qué incluye el servicio de reparación de UTAs?**
   Extracción de ejes, provisión de rodamientos, cambio de motor, alineación, balanceo dinámico INSITU y control de vibraciones final. Trabajo in situ por complejidad de desmontaje.

9. **¿Cuánto tiempo lleva un servicio de balanceo in situ?**
   Varía según el equipo. Un balanceo in situ de ventilador industrial típicamente se realiza en 4 a 8 horas, sin necesidad de desmontar el equipo. Se coordina para minimizar paradas de producción.

10. **¿Cómo solicitar un presupuesto?**
    Contacto por teléfono al 011 4919-9922, WhatsApp al 15 3574-4732, o formulario en línea. Respondemos en el día para urgencias.

**Design:** Accordion-style. Style matches existing border/card pattern (border `border-ink-200`, background `var(--ink-50)` or white). Section has `id="preguntas-frecuentes"`.

**FAQPage schema** injected alongside component via `useEffect`.

→ **TEST:** Google Rich Results Test for FAQPage schema; visual QA accordion open/close; mobile layout.

**Rollback:** Remove `<FAQ />` from App.tsx; delete file
**Risk:** LOW

---

### Substep 9 — `Footer.tsx`: semantic `<address>` + aria-labels
**Files:** `src/components/Footer.tsx`
**Constraint check:** None.

**Changes:**
- Wrap the contact info `<div>` in `<address>` element with `aria-label="Información de contacto de Balanceo Baltec"`
- Phone `<a href="tel:01149199922">` — already present, verify `href` format uses country code: `href="tel:+541149199922"`
- WhatsApp link already has `href="https://wa.me/5491535744732"` — correct
- Email `<a href="mailto:info@balanceobaltec.com">` — already present, verify
- Add `<footer aria-label="Pie de página Balanceo Baltec">` wrapper

→ **TEST:** Accessibility audit with browser DevTools > Accessibility panel; verify phone link dials correctly on mobile.

**Rollback:** Revert Footer.tsx
**Risk:** LOW

---

## OG Image — stop-and-ask (pre-execution)

**Stop before Substep 1:** The OG image (`/public/og-image.jpg`, 1200×630px) does not currently exist. Before starting, decide:
- **Option A:** Use `/dist/baltec.png` (logo only) as temporary OG image — not ideal but functional
- **Option B:** Create a simple branded OG card (hero screenshot + logo + tagline overlay) — 30 min design work
- **Option C:** Skip OG image tag for now; add when asset is ready

This decision affects Substep 1 and Substep 3 (schema image URL). Executor must ask user before proceeding with Substep 1.

---

## Risk Tier per substep

| Substep | Risk | Reason |
|---|---|---|
| 1 — index.html | LOW | Additive only |
| 2 — robots/sitemap | LOW | New static files |
| 3 — SEOHead JSON-LD | LOW | Additive script injection |
| 4 — Hero copy | LOW | Text only, visual unchanged |
| 5 — Services copy | LOW | Text only, tab labels unchanged |
| 6 — About copy | LOW | Text only |
| 7 — Clients/Problems | LOW | Text + aria attributes |
| 8 — FAQ component | LOW | New component, design-system compliant |
| 9 — Footer semantic | LOW | Additive attributes |

All substeps LOW. No schema changes, no routing, no new external dependencies.

---

## Stop-and-Ask Triggers

1. **OG image asset missing** — ask before Substep 1 (see above)
2. **LinkedIn/social profile URLs** — for schema `sameAs` field: ask user for actual LinkedIn company page URL before Substep 3
3. **Actual domain URL** — if `balanceobaltec.com` is not the live domain, all canonical/OG/schema URLs must use the real domain. Verify before Substep 1.
4. **FAQ section design conflict** — if accordion style doesn't match design system, surface to user before building

---

## Model / Thinking Recommendation

All substeps: Sonnet (standard). Entirely mechanical SEO work — no complex logic, no cryptography, no architecture decisions. FAQ content writing benefits from having research context loaded (already in context).

---

## Changelog from v1

| Change | Finding | Detail |
|---|---|---|
| Title updated | F7 | "Balanceo Dinámico Industrial · Reparación de Equipos Rotativos · Baltec Buenos Aires" — keyword-stacked pattern |
| Meta desc updated | F1, F4, F5 | Added CABA/AMBA, alineación láser, análisis de vibraciones |
| Hero H1 geo modifier added | F4 | "en Buenos Aires" appended to H1 line 1 |
| Hero subtitle rewritten | F4, F5 | Includes CABA/AMBA + alineación láser + vibraciones |
| UTA service full keyword form | F6 | "Reparación y balanceo dinámico de UTAs — Unidades de Tratamiento de Aire" |
| All service `long` headings prefixed | F3, F5 | "Reparación y balanceo dinámico de…" pattern — primary keyword in every H3 |
| About body copy updated | F4, F8 | CABA/AMBA + ISO 21940 mention |
| Problems H3 enriched | F5 | "por vibración", "en equipos rotativos", "mecánicas" added |
| Clients H2/body enriched | F10 | "en Argentina" + named industries matching client logos |
| FAQ questions expanded | F6, F8, F9 | UTA question, ISO 21940 question, AMBA zone question with named industrial corridors |
| "equilibrado" deprioritized | F3 | Not used as primary keyword in any heading — appears only in FAQ answer as secondary variant |
| OG image stop-and-ask added | — | Asset doesn't exist; must decide before execution |
| LinkedIn URL stop-and-ask added | — | Schema `sameAs` needs real URL |
