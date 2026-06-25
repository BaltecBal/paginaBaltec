import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';

export interface CartItem {
  id: string;
  name: string;
  shortDesc: string;
  quantity: number;
  addedAt: number;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: 'add'; payload: { id: string; name: string; shortDesc: string } }
  | { type: 'remove'; payload: { id: string } }
  | { type: 'setQuantity'; payload: { id: string; quantity: number } }
  | { type: 'clear' }
  | { type: 'hydrate'; payload: { items: CartItem[] } };

const STORAGE_KEY = 'baltec-cart-v1';

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.payload.id,
            name: action.payload.name,
            shortDesc: action.payload.shortDesc,
            quantity: 1,
            addedAt: Date.now(),
          },
        ],
      };
    }
    case 'remove':
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case 'setQuantity': {
      const next = Math.max(1, Math.min(99, action.payload.quantity));
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: next } : i
        ),
      };
    }
    case 'clear':
      return { items: [] };
    case 'hydrate':
      return { items: action.payload.items };
    default:
      return state;
  }
};

interface CartContextValue {
  items: CartItem[];
  count: number;
  totalUnits: number;
  isOpen: boolean;
  add: (product: { id: string; name: string; shortDesc: string }) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { items?: CartItem[] };
      if (parsed && Array.isArray(parsed.items)) {
        dispatch({ type: 'hydrate', payload: { items: parsed.items } });
      }
    } catch {
      // Ignore malformed JSON; start fresh
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {
      // localStorage full or disabled — silently no-op
    }
  }, [state.items]);

  const add = useCallback(
    (product: { id: string; name: string; shortDesc: string }) =>
      dispatch({ type: 'add', payload: product }),
    []
  );
  const remove = useCallback((id: string) => dispatch({ type: 'remove', payload: { id } }), []);
  const setQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: 'setQuantity', payload: { id, quantity } }),
    []
  );
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.length;
    const totalUnits = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return {
      items: state.items,
      count,
      totalUnits,
      isOpen,
      add,
      remove,
      setQuantity,
      clear,
      open,
      close,
      toggle,
    };
  }, [state.items, isOpen, add, remove, setQuantity, clear, open, close, toggle]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
};
