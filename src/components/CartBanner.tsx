import { ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cart';

const MIN_ITEMS_FOR_BANNER = 3; // "more than two items" → count > 2

const CartBanner = () => {
  const { count, open } = useCart();
  const visible = count >= MIN_ITEMS_FOR_BANNER;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-0 left-0 right-0 z-[55] transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <button
        type="button"
        onClick={open}
        className="relative w-full text-left bg-navy-900 text-white hover:bg-[#0d1a2e] transition-colors border-t border-white/15"
        aria-label="Abrir carrito"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 h-12 sm:h-14 flex items-center gap-3">
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <p className="flex-1 text-sm sm:text-base">
            <span className="hidden sm:inline">
              Agregaste items a tu carrito{' '}
              <span className="text-white/70">· {count} {count === 1 ? 'producto' : 'productos'}</span>
            </span>
            <span className="sm:hidden">
              Agregaste items{' '}
              <span className="text-white/70">· {count}</span>
            </span>
          </p>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-white">
            Consultar
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default CartBanner;
