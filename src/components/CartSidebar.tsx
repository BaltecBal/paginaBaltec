import { useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { useCart } from '../lib/cart';

const VENTAS_WHATSAPP = '541149397144';

const buildWhatsAppUrl = (
  items: { name: string; quantity: number }[]
): string => {
  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);
  const lines = [
    'Hola, me gustaría consultar por los siguientes productos del catálogo:',
    '',
    ...items.map((i) => `- ${i.name} (x${i.quantity})`),
    '',
    `Total: ${totalUnits} ${totalUnits === 1 ? 'unidad' : 'unidades'}.`,
  ];
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${VENTAS_WHATSAPP}?text=${text}`;
};

const CartSidebar = () => {
  const { items, count, isOpen, close, remove, setQuantity } = useCart();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de cotización"
        className={`fixed top-0 right-0 z-[61] h-full w-full sm:w-[380px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-ink-200 flex-shrink-0">
          <div>
            <h2 className="h2 text-navy-900">Tu carrito</h2>
            <p className="caption text-ink-500 mt-0.5">
              {count === 0
                ? 'Sin productos'
                : `${count} ${count === 1 ? 'producto' : 'productos'} · ${items.reduce((s, i) => s + i.quantity, 0)} unidades`}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center w-10 h-10 text-ink-800 hover:text-navy-800 hover:bg-ink-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--ink-100)' }}
              >
                <X className="w-7 h-7" style={{ color: 'var(--ink-400, #94a3b8)' }} />
              </div>
              <p className="h3 text-navy-900 mb-2">Tu carrito está vacío</p>
              <p className="body text-ink-500 max-w-xs">
                Agregá productos desde el catálogo para armar tu lista de cotización.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-3 list-none">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="py-3 px-3 sm:py-5 sm:px-0 border border-ink-100 sm:border-0 sm:border-b sm:last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] sm:text-base font-semibold text-navy-900 break-words leading-tight line-clamp-2 mb-2">{item.name}</h3>

                    <div className="flex items-center justify-between gap-1.5">
                      {/* Quantity stepper — compact on mobile */}
                      <div className="inline-flex items-center border border-ink-200">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-ink-800 hover:text-navy-800 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className="inline-flex items-center justify-center min-w-[32px] sm:min-w-[44px] h-8 sm:h-10 font-mono text-sm sm:text-base text-navy-900 border-x border-ink-200"
                          aria-label={`Cantidad actual: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 99}
                          className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-ink-800 hover:text-navy-800 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-ink-500 hover:text-accent hover:bg-ink-100 transition-colors"
                        aria-label={`Quitar ${item.name} del carrito`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="caption text-ink-500 line-clamp-2 hidden sm:block mt-2">{item.shortDesc}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — sticky CTA */}
        {items.length > 0 && (
          <footer className="border-t border-ink-200 px-5 sm:px-6 py-4 flex-shrink-0 bg-white">
            <a
              href={buildWhatsAppUrl(items.map((i) => ({ name: i.name, quantity: i.quantity })))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full justify-center"
              style={{ minHeight: '48px' }}
              onClick={close}
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
            <p className="caption text-ink-500 text-center mt-3">
              Te responderemos a la brevedad con disponibilidad y precios.
            </p>
          </footer>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
