import { useState } from 'react';
import { Plus, Check, Minus, Trash2 } from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';
import type { Product } from '../data/products';
import { useCart } from '../lib/cart';

interface ProductCardProps {
  product: Product;
}

const categoryFromId = (id: string): string => {
  if (id.startsWith('borneras')) return 'borneras';
  if (id.startsWith('caja-conexion') || id.startsWith('cubre-cap')) return 'cajas';
  if (id.startsWith('cap')) return 'capacitores';
  if (id.startsWith('imp')) return 'impulsores';
  if (id.startsWith('turb')) return 'turbinas';
  if (id.startsWith('vent')) return 'ventiladores';
  return 'cajas';
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, add, remove, setQuantity } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const inCart = !!cartItem;
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add({ id: product.id, name: product.name, shortDesc: product.shortDesc });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      className={`group relative flex flex-col h-full bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,45,99,0.25)] focus-within:-translate-y-0.5 focus-within:shadow-[0_12px_32px_-12px_rgba(20,45,99,0.25)] ${
        inCart ? 'border border-navy-800' : 'border border-ink-200 hover:border-navy-800 focus-within:border-navy-800'
      }`}
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
        {inCart && (
          <span
            className="absolute top-2 left-2 caption uppercase tracking-[0.18em] px-2 py-1"
            style={{ background: 'var(--accent)', color: 'white', fontSize: '10px' }}
          >
            En tu carrito
          </span>
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

        {inCart ? (
          <div className="mt-auto pt-4 border-t border-ink-100">
            <div className="flex items-center justify-between gap-2">
              {/* Quantity stepper */}
              <div className="inline-flex items-center border border-navy-800">
                <button
                  type="button"
                  onClick={() => setQuantity(product.id, cartItem.quantity - 1)}
                  disabled={cartItem.quantity <= 1}
                  className="inline-flex items-center justify-center w-11 h-11 text-navy-800 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                  aria-label={`Disminuir cantidad de ${product.name}`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="inline-flex items-center justify-center min-w-[48px] h-11 font-mono text-base text-navy-900 border-x border-navy-800"
                  aria-label={`Cantidad en carrito: ${cartItem.quantity}`}
                >
                  {cartItem.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(product.id, cartItem.quantity + 1)}
                  disabled={cartItem.quantity >= 99}
                  className="inline-flex items-center justify-center w-11 h-11 text-navy-800 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                  aria-label={`Aumentar cantidad de ${product.name}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(product.id)}
                className="inline-flex items-center justify-center w-11 h-11 text-ink-500 hover:text-accent hover:bg-ink-100 transition-colors"
                aria-label={`Quitar ${product.name} del carrito`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-4 border-t border-ink-100">
            <button
              type="button"
              onClick={handleAdd}
              className={`btn w-full justify-center transition-colors duration-200 ${
                justAdded ? 'btn-light' : 'btn-primary'
              }`}
              style={{ minHeight: '44px' }}
              aria-label={`Agregar ${product.name} al carrito`}
              disabled={justAdded}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Agregar al carrito
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
