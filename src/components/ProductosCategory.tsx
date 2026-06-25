import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import SEOHead from './SEOHead';
import { CategoryIcon } from './CategoryIcon';
import ProductCard from './ProductCard';
import { categories, type Product, type Category } from '../data/products';
import {
  useHashRoute,
  navigateProductos,
  navigateProductosCategory,
  productosCategoryLink,
} from '../lib/router';
import { safeScrollToId } from '../lib/nav';

const WHATSAPP_NUMBER = '5491535744732';
const buildWhatsAppLink = (product: Product): string => {
  const text = encodeURIComponent(
    `Hola, me interesa consultar por "${product.name}" del catálogo de productos de Baltec.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

interface ProductosCategoryProps {
  categoryId: string | null;
}

const ProductosCategory = ({ categoryId }: ProductosCategoryProps) => {
  const route = useHashRoute();
  const goToContact = () => safeScrollToId('contacto', route);

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId) || null,
    [categoryId]
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [categoryId]);

  // Unknown category → 404-style fallback (renders a small "not found" section)
  if (!category) {
    return (
      <>
        <SEOHead
          title="Categoría no encontrada | Baltec"
          description="La categoría solicitada no existe en el catálogo de Baltec."
          canonical="https://www.balanceobaltec.com/#/productos"
        />
        <main className="bg-paper">
          <section
            className="pt-32 pb-20 md:pt-40 md:pb-28"
            style={{ background: 'var(--navy-800)' }}
          >
            <div className="max-w-[1320px] mx-auto px-6 md:px-10">
              <span className="eyebrow text-white/60 mb-4 inline-flex">
                <span className="num text-accent">·</span>
                <span className="dash bg-white/40" />
                <span>Error 404</span>
              </span>
              <h1 className="display-3 md:display-2 text-white">
                Categoría no <em className="underline-hand-white">encontrada.</em>
              </h1>
              <p className="body-lg text-white/75 mt-4 max-w-xl">
                La categoría que buscás no existe o fue removida del catálogo.
              </p>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={navigateProductos}
                  className="btn btn-light"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al catálogo
                </button>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return <CategoryView category={category} goToContact={goToContact} />;
};

// ── Category view ───────────────────────────────────────────

const CategoryView = ({
  category,
  goToContact,
}: {
  category: Category;
  goToContact: () => void;
}) => {
  const isVentiladores = category.id === 'ventiladores';
  const isCajas = category.id === 'cajas';

  const [tipoFilter, setTipoFilter] = useState<'all' | 'Refrigerante' | 'Estriado'>('all');

  useEffect(() => {
    setTipoFilter('all');
  }, [category.id]);

  // Cajas: sub-group split
  const subGroups = useMemo(() => {
    if (!isCajas) return null;
    const map = new Map<string, Product[]>();
    for (const it of category.items) {
      const key = it.subGroup || 'General';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }
    return Array.from(map.entries());
  }, [category.items, isCajas]);

  // Apply tipo filter for Ventiladores
  const filteredItems = useMemo(() => {
    if (!isVentiladores) return category.items;
    if (tipoFilter === 'all') return category.items;
    return category.items.filter((i) => i.tipo === tipoFilter);
  }, [category.items, isVentiladores, tipoFilter]);

  const tipoCounts = useMemo(() => {
    if (!isVentiladores) return null;
    const counts: Record<string, number> = {};
    for (const it of category.items) {
      if (it.tipo) counts[it.tipo] = (counts[it.tipo] || 0) + 1;
    }
    return counts;
  }, [category.items, isVentiladores]);

  const totalShown = filteredItems.length;
  const canonical = `https://www.balanceobaltec.com${productosCategoryLink(category.id)}`;

  return (
    <>
      <SEOHead
        title={`${category.name} | Baltec — Catálogo`}
        description={`${category.name}: ${category.description} ${totalShown} productos disponibles. Consulte por WhatsApp o solicite cotización.`}
        keywords={`${category.name.toLowerCase()}, ${category.description.toLowerCase().split(' ').slice(0, 8).join(', ')}, Baltec, Buenos Aires`}
        canonical={canonical}
      />

      <main className="bg-paper">
        {/* ── Hero ─ same pattern as the index page (proven to work) ── */}
        <section
          className="pt-28 pb-10 md:pt-32 md:pb-12"
          style={{ background: 'var(--navy-800)' }}
        >
          <div className="max-w-[1320px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl flex items-center gap-4">
                <div
                  className="hidden md:flex items-center justify-center w-12 h-12 flex-shrink-0 text-white/80"
                  aria-hidden="true"
                >
                  <CategoryIcon categoryId={category.id} className="w-10 h-10" />
                </div>
                <div className="min-w-0">
                  <span className="eyebrow text-white/60 mb-2 inline-flex">
                    <span className="num text-accent">·</span>
                    <span className="dash bg-white/40" />
                    <span>Categoría</span>
                  </span>
                  <h1 className="text-2xl md:text-4xl font-semibold text-white truncate leading-tight">
                    {category.name}
                  </h1>
                </div>
              </div>
              <div className="flex items-baseline gap-2 text-white/70 flex-shrink-0">
                <span className="font-mono text-xl text-white">{totalShown}</span>
                <span className="caption uppercase tracking-[0.18em]">
                  {totalShown === 1 ? 'producto' : 'productos'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Toolbar: back + category switcher ─────────── */}
        <section
          aria-label="Barra de navegación de categoría"
          className="bg-paper border-b border-ink-200"
        >
          <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-4">
            <div className="flex flex-col gap-3">
              {/* Back link — on top, prominent */}
              <button
                type="button"
                onClick={navigateProductos}
                className="group inline-flex items-center gap-2 text-navy-800 hover:text-accent transition-colors duration-200 self-start"
                aria-label="Volver al catálogo"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span className="caption uppercase tracking-[0.18em]">
                  Volver al catálogo
                </span>
              </button>

              {/* Category switcher */}
              <nav aria-label="Cambiar de categoría">
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const isActive = c.id === category.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => navigateProductosCategory(c.id)}
                        className={`group inline-flex items-center gap-2 px-3 py-1.5 border text-sm transition-colors duration-200 ${
                          isActive
                            ? 'border-navy-800 text-white bg-navy-800'
                            : 'border-ink-200 text-ink-800 hover:border-navy-800 hover:text-navy-800'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <CategoryIcon
                        categoryId={c.id}
                        className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-ink-500'}`}
                      />
                      <span className="caption uppercase tracking-[0.14em] text-xs">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* ── Products ─────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-6 md:px-10">
            {/* Ventiladores: tipo filter */}
            {isVentiladores && tipoCounts && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="caption uppercase tracking-[0.18em] text-ink-500 mr-1">
                  Filtrar:
                </span>
                <button
                  type="button"
                  onClick={() => setTipoFilter('all')}
                  className={`caption uppercase tracking-[0.14em] text-xs px-3 py-1.5 border transition-colors duration-200 ${
                    tipoFilter === 'all'
                      ? 'bg-navy-800 text-white border-navy-800'
                      : 'border-ink-200 text-ink-800 hover:border-navy-800'
                  }`}
                >
                  Todos ({category.items.length})
                </button>
                {Object.entries(tipoCounts).map(([tipo, count]) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoFilter(tipo as 'Refrigerante' | 'Estriado')}
                    className={`caption uppercase tracking-[0.14em] text-xs px-3 py-1.5 border transition-colors duration-200 ${
                      tipoFilter === tipo
                        ? 'bg-navy-800 text-white border-navy-800'
                        : 'border-ink-200 text-ink-800 hover:border-navy-800'
                    }`}
                  >
                    {tipo} ({count})
                  </button>
                ))}
              </div>
            )}

            {/* Sub-groups (Cajas) OR plain grid */}
            {subGroups ? (
              <div className="space-y-12">
                {subGroups.map(([groupName, groupItems]) => (
                  <div key={groupName}>
                    <div className="flex items-baseline justify-between mb-5">
                      <h2 className="h2 text-navy-800">{groupName}</h2>
                      <span className="caption text-ink-500">
                        {groupItems.length} {groupItems.length === 1 ? 'producto' : 'productos'}
                      </span>
                    </div>
                    <ul
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 list-none"
                      aria-label={`${groupName} en ${category.name}`}
                    >
                      {groupItems.map((product) => (
                        <li key={product.id}>
                          <ProductCard product={product} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 list-none"
                aria-label={`Productos en ${category.name}`}
              >
                {filteredItems.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ── Closing CTA ─────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: 'var(--navy-900)' }}
        >
          <div className="max-w-[1320px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow text-white/60 mb-3 inline-flex">
                  <span className="num text-accent">·</span>
                  <span className="dash bg-white/40" />
                  <span>¿Necesita ayuda?</span>
                </span>
                <h2 className="h1 text-white">
                  Asesórese con <em className="underline-hand-white">nuestro equipo.</em>
                </h2>
                <p className="body text-white/70 mt-3">
                  Cuéntenos qué necesita y le recomendamos el producto correcto para su aplicación.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hola, necesito asesoramiento sobre ${category.name.toLowerCase()}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hablar por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={goToContact}
                  className="btn btn-ghost-dark"
                >
                  <FileText className="w-4 h-4" />
                  Pedir cotización
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// ── Product card (shared component) ───────────────────────────

export default ProductosCategory;