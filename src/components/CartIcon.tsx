import { ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cart';

interface CartIconProps {
  variant?: 'header' | 'mobile';
  className?: string;
  onClick?: () => void;
}

const CartIcon = ({ variant = 'header', className = '', onClick }: CartIconProps) => {
  const { count, totalUnits, isOpen, toggle } = useCart();
  const showBadge = count > 0;

  const handleClick = () => {
    toggle();
    onClick?.();
  };

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`relative inline-flex items-center gap-3 px-4 py-3 text-white transition-colors ${
          isOpen ? 'text-accent' : 'text-white/80 hover:text-white'
        } ${className}`}
        aria-label={`Carrito${showBadge ? ` (${count} ${count === 1 ? 'producto' : 'productos'})` : ''}`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="text-sm font-medium">Carrito</span>
        {showBadge && (
          <span
            className="ml-auto inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-mono"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            {totalUnits}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center w-10 h-10 transition-colors ${
        isOpen ? 'text-accent' : 'text-white/80 hover:text-white'
      } ${className}`}
      aria-label={`Carrito${showBadge ? ` (${count} ${count === 1 ? 'producto' : 'productos'})` : ''}`}
    >
      <ShoppingCart className="w-5 h-5" />
      {showBadge && (
        <span
          className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono rounded-full"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          {totalUnits}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
