import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import SEOHead from './SEOHead';
import { CategoryIcon } from './CategoryIcon';
import { categories, type Product, type Category } from '../data/products';
import {
  navigateProductos,
  productosCategoryLink,
} from '../lib/router';

const WHATSAPP_NUMBER = '5491535744732';
const buildWhatsAppLink = (product: Product): string => {
  const text = encodeURIComponent(
    `Hola, me interesa consultar por "${product.name}" (${product.marca}) del catálogo de productos de Baltec.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const scrollToContact = (): void => {
  const element = document.getElementById('contacto');
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - 60, behavior: 'smooth' });
  }
};

interface ProductosCategoryProps {
  categoryId: string | null;
}

const ProductosCategory = ({ categoryId }: ProductosCategoryProps) => {
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

  return <CategoryView category={category} />;
};

// ── Category view ───────────────────────────────────────────

const CategoryView = ({ category }: { category: Category }) => {
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
        {/* ── Hero ─────────────────────────────────────── */}
        <section
          className="pt-24 pb-10 md:pt-28 md:pb-12"
          style={{ background: 'var(--navy-800)' }}
        >
          <div className="max-w-[1320px] mx-auto px-6 md:px-10">
            {/* Breadcrumb */}
            <nav
              aria-label="Navegación"
              className="mb-8 flex items-center gap-2 caption uppercase tracking-[0.18em] text-white/60"
            >
              <button
                type="button"
                onClick={navigateProductos}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Catálogo
              </button>
              <span className="text-white/30">/</span>
              <span className="text-white">{category.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-end gap-4">
                  <div
                    className="hidden md:flex items-center justify-center w-12 h-12 mb-1 text-white/80"
                    aria-hidden="true"
                  >
                    <CategoryIcon categoryId={category.id} className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="eyebrow text-white/60 mb-3 inline-flex">
                      <span className="num text-accent">·</span>
                      <span className="dash bg-white/40" />
                      <span>Categoría</span>
                    </span>
                    <h1 className="display-3 md:display-2 text-white">
                      {category.name}
                    </h1>
                  </div>
                </div>
                <p className="body text-white/70 mt-4 max-w-xl">
                  {category.description}
                </p>
              </div>
              <div className="flex items-center gap-6 text-white/70 flex-shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl text-white">{totalShown}</span>
                  <span className="caption uppercase tracking-[0.18em]">
                    {totalShown === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
              </div>
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
                  onClick={scrollToContact}
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

// ── Product card (shared — duplicated here to keep this component self-contained) ─

const ProductCard = ({ product }: { product: Product }) => {
  const categoryFromId = (id: string): string => {
    if (id.startsWith('borneras')) return 'borneras';
    if (id.startsWith('caja-conexion') || id.startsWith('cubre-cap')) return 'cajas';
    if (id.startsWith('cap')) return 'capacitores';
    if (id.startsWith('imp')) return 'impulsores';
    if (id.startsWith('turb')) return 'turbinas';
    if (id.startsWith('vent')) return 'ventiladores';
    return 'cajas';
  };

  return (
    <article
      className="group relative flex flex-col h-full border border-ink-200 bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,45,99,0.25)] hover:border-navy-800 focus-within:-translate-y-0.5 focus-within:shadow-[0_12px_32px_-12px_rgba(20,45,99,0.25)] focus-within:border-navy-800"
    >
      <div className="relative aspect-[16/10] bg-ink-100 overflow-hidden border-b border-ink-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-navy-800 transition-transform duration-500 ease-out group-hover:scale-105">
            <CategoryIcon
              categoryId={categoryFromId(product.id)}
              className="w-16 h-16"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="mb-2 flex items-center flex-wrap gap-x-1.5">
          <span className="caption uppercase tracking-[0.18em] text-ink-500">
            {product.marca}
          </span>
          {product.tipo && (
            <>
              <span className="caption text-ink-300">·</span>
              <span className="caption uppercase tracking-[0.18em] text-accent">
                {product.tipo}
              </span>
            </>
          )}
        </div>

        <h3 className="h3 text-navy-900 mb-2 break-words">{product.name}</h3>
        <p className="caption text-ink-500 mb-4 line-clamp-3 flex-1">{product.shortDesc}</p>

        <div className="flex gap-2 mt-auto pt-4 border-t border-ink-100">
          <a
            href={buildWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-1 justify-center"
            style={{ padding: '10px 12px', fontSize: '13px' }}
            aria-label={`Consultar por WhatsApp sobre ${product.name}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={scrollToContact}
            className="btn btn-ghost flex-1 justify-center"
            style={{ padding: '10px 12px', fontSize: '13px' }}
            aria-label={`Pedir cotización de ${product.name}`}
          >
            <FileText className="w-3.5 h-3.5" />
            Cotizar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductosCategory;