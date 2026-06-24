import { useEffect, useMemo } from 'react';
import { MessageCircle, FileText, ArrowRight } from 'lucide-react';
import SEOHead from './SEOHead';
import { CategoryIcon } from './CategoryIcon';
import { categories, totalItems, type Product, type Category } from '../data/products';
import { useHashRoute, productosCategoryLink } from '../lib/router';
import { safeScrollToId } from '../lib/nav';

const WHATSAPP_NUMBER = '5491535744732';
const buildWhatsAppLink = (product: Product): string => {
  const text = encodeURIComponent(
    `Hola, me interesa consultar por "${product.name}" del catálogo de productos de Baltec.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

// How many items to show per category on the index page (one row of cards at desktop)
const INITIAL_VISIBLE = 4;

const Productos = () => {
  const route = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const goToContact = () => safeScrollToId('contacto', route);

  return (
    <>
      <SEOHead
        title="Productos | Baltec — Equipos e Instrumental Industrial"
        description="Catálogo de productos Baltec: borneras, cajas de conexión, capacitores, impulsores, turbinas y ventiladores para motores eléctricos industriales. Consulte por WhatsApp o solicite cotización."
        keywords="borneras, cajas de conexión, capacitores, impulsores, turbinas, ventiladores, motores eléctricos, Baltec, Buenos Aires"
        canonical="https://www.balanceobaltec.com/#/productos"
      />

      <main className="bg-paper">
        {/* ── Hero ─────────────────────────────────────── */}
        <section
          className="pt-28 pb-10 md:pt-32 md:pb-12"
          style={{ background: 'var(--navy-800)' }}
        >
          <div className="max-w-[1320px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <span className="eyebrow text-white/60 mb-4 inline-flex">
                  <span className="num text-accent">·</span>
                  <span className="dash bg-white/40" />
                  <span>Catálogo</span>
                </span>
                <h1 className="display-3 md:display-2 text-white">
                  Nuestros <em className="underline-hand-white">productos.</em>
                </h1>
                <p className="body text-white/70 mt-4 max-w-xl">
                  {totalItems} referencias en {categories.length} categorías para mantenimiento
                  y reparación de motores eléctricos.
                </p>
              </div>
              <div className="flex items-center gap-6 text-white/70 flex-shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl text-white">{totalItems}</span>
                  <span className="caption uppercase tracking-[0.18em]">productos</span>
                </div>
                <span className="w-px h-5 bg-white/20" />
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl text-white">{categories.length}</span>
                  <span className="caption uppercase tracking-[0.18em]">categorías</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Catalog (one section per category) ───────── */}
        <div id="catalogo">
          {categories.map((category, idx) => (
            <CategorySection key={category.id} category={category} idx={idx} />
          ))}
        </div>

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
                  <span>¿No encuentra lo que busca?</span>
                </span>
                <h2 className="h1 text-white">
                  Consúltenos — <em className="underline-hand-white">tenemos más opciones.</em>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hola, necesito un producto que no encuentro en el catálogo.'
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

// ── Category section (on the index) ──────────────────────────

interface CategorySectionProps {
  category: Category;
  idx: number;
}

const CategorySection = ({ category, idx }: CategorySectionProps) => {
  const isCajas = category.id === 'cajas';

  // Cajas: sub-group split (only first 4 of each on the index)
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

  const visibleItems = category.items.slice(0, INITIAL_VISIBLE);
  const hasMore = category.items.length > INITIAL_VISIBLE;

  return (
    <section
      id={`cat-${category.id}`}
      className={`py-12 md:py-16 scroll-mt-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-paper'}`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* Category header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 md:mb-8 pb-4 border-b border-ink-200">
          <div className="flex items-end gap-4">
            <div
              className="hidden md:flex items-center justify-center w-12 h-12 mb-1 text-navy-800"
              aria-hidden="true"
            >
              <CategoryIcon categoryId={category.id} className="w-10 h-10" />
            </div>
            <div>
              <span className="eyebrow mb-2 inline-flex">
                <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="dash" />
                <span>Categoría</span>
              </span>
              <h2 className="h1 text-navy-900">{category.name}</h2>
            </div>
          </div>
          <p className="caption text-ink-500 max-w-md md:text-right">
            {category.description}
          </p>
        </div>

        {/* Sub-groups (Cajas) OR plain grid */}
        {subGroups ? (
          <div className="space-y-10">
            {subGroups.map(([groupName, groupItems]) => {
              const visibleGroup = groupItems.slice(0, INITIAL_VISIBLE);
              const hasMoreInGroup = groupItems.length > INITIAL_VISIBLE;
              return (
                <div key={groupName}>
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="h2 text-navy-800">{groupName}</h3>
                    <span className="caption text-ink-500">
                      {groupItems.length} {groupItems.length === 1 ? 'producto' : 'productos'}
                    </span>
                  </div>
                  <ul
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 list-none"
                    aria-label={`${groupName} en ${category.name}`}
                  >
                    {visibleGroup.map((product) => (
                      <li key={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                  {hasMoreInGroup && (
                    <div className="mt-6 flex justify-center">
                      <SeeAllCategoryLink
                        href={productosCategoryLink(category.id)}
                        count={groupItems.length}
                        label={`Ver todos los ${groupName.toLowerCase()}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 list-none"
              aria-label={`Productos en ${category.name}`}
            >
              {visibleItems.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            {hasMore && (
              <div className="mt-6 flex justify-center">
                <SeeAllCategoryLink
                  href={productosCategoryLink(category.id)}
                  count={category.items.length}
                  label="Ver todos los productos"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// ── "Ver todos" link to category page ───────────────────────

const SeeAllCategoryLink = ({
  href,
  count,
  label,
}: {
  href: string;
  count: number;
  label: string;
}) => (
  <a
    href={href}
    className="group inline-flex items-center gap-2 px-5 py-2.5 border border-ink-200 hover:border-navy-800 hover:bg-navy-800 hover:text-white text-navy-800 transition-colors duration-200"
  >
    <span className="caption uppercase tracking-[0.18em]">
      {label} <span className="font-mono text-ink-500 group-hover:text-white/70">({count})</span>
    </span>
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </a>
);

// ── Product card ─────────────────────────────────────────────

const ProductCard = ({ product }: { product: Product }) => {
  const route = useHashRoute();
  const goToContact = () => safeScrollToId('contacto', route);

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
        {product.tipo && (
          <div className="mb-2">
            <span className="caption uppercase tracking-[0.18em] text-accent">
              {product.tipo}
            </span>
          </div>
        )}

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
            onClick={goToContact}
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

export default Productos;