import { useEffect, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import SEOHead from './SEOHead';
import ProductCard from './ProductCard';
import { type Category } from '../data/products';
import { useCatalog } from '../lib/catalog';
import { navigateProductos, navigateProductosCategory } from '../lib/router';

const WHATSAPP_NUMBER = '5491535744732';

/**
 * The whole catalog on one slim page: a compact header, category chips that
 * FILTER the single grid (no per-category sub-pages), and the cards. The
 * chips write the hash (#/productos/<id>) so old category links keep working
 * as pre-applied filters and a filtered view stays shareable.
 */
const Productos = ({ categoryId = null }: { categoryId?: string | null }) => {
  const { categories, totalItems } = useCatalog();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Exact id first; then first-slug-segment so the bundled short ids and the
  // live catalog's full slugs both resolve (e.g. "cajas" → "cajas-de-…").
  const active: Category | null = useMemo(() => {
    if (!categoryId) return null;
    return (
      categories.find((c) => c.id === categoryId) ||
      categories.find((c) => c.id.split('-')[0] === categoryId.split('-')[0]) ||
      null
    );
  }, [categories, categoryId]);

  const items = useMemo(
    () =>
      active
        ? active.items.map((p) => ({ p, cat: active.id }))
        : categories.flatMap((c) => c.items.map((p) => ({ p, cat: c.id }))),
    [categories, active],
  );

  const chip = (label: string, isActive: boolean, onClick: () => void, key: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`px-3 py-1.5 text-xs sm:text-sm uppercase tracking-[0.08em] border transition-colors duration-200 whitespace-nowrap ${
        isActive
          ? 'bg-navy-800 text-white border-navy-800'
          : 'bg-white text-ink-800 border-ink-200 hover:border-navy-800 hover:text-navy-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <SEOHead
        title="Productos | Baltec — Equipos e Instrumental Industrial"
        description="Catálogo de productos Baltec: borneras, cajas de conexión, capacitores, impulsores, turbinas y ventiladores para motores eléctricos industriales. Consulte por WhatsApp o solicite cotización."
        keywords="borneras, cajas de conexión, capacitores, impulsores, turbinas, ventiladores, motores eléctricos, Baltec, Buenos Aires"
        canonical="https://www.balanceobaltec.com/#/productos"
      />

      <main className="bg-paper">
        {/* ── Slim hero ──────────────────────────────── */}
        <section className="pt-24 pb-6 md:pt-28 md:pb-8" style={{ background: 'var(--navy-800)' }}>
          <div className="max-w-[1320px] mx-auto px-4 md:px-10 flex items-end justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Productos<span className="text-accent">.</span>
            </h1>
            <p className="text-white/60 text-sm whitespace-nowrap">
              <span className="font-mono text-white">{active ? items.length : totalItems}</span>{' '}
              {items.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>
        </section>

        {/* ── Category filter chips ──────────────────── */}
        <div className="sticky top-14 md:top-16 z-30 bg-paper/95 backdrop-blur border-b border-ink-200">
          <div className="max-w-[1320px] mx-auto px-4 md:px-10 py-3 flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {chip('Todas', !active, () => navigateProductos(), 'todas')}
            {categories.map((c) =>
              chip(c.name, active?.id === c.id, () => navigateProductosCategory(c.id), c.id),
            )}
          </div>
        </div>

        {/* ── The grid ───────────────────────────────── */}
        <section className="py-6 md:py-10">
          <div className="max-w-[1320px] mx-auto px-4 md:px-10">
            {active?.description && (
              <p className="caption text-ink-500 mb-4 max-w-2xl">{active.description}</p>
            )}
            <ul
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 list-none"
              aria-label={active ? `Productos en ${active.name}` : 'Todos los productos'}
            >
              {items.map(({ p, cat }) => (
                <li key={p.id}>
                  <ProductCard product={p} categoryId={cat} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Slim closing CTA ───────────────────────── */}
        <section className="py-10" style={{ background: 'var(--navy-900)' }}>
          <div className="max-w-[1320px] mx-auto px-4 md:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-white/80">
              ¿No encuentra lo que busca? <span className="text-white font-medium">Tenemos más opciones.</span>
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hola, necesito un producto que no encuentro en el catálogo.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light self-start sm:self-auto"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Productos;
