import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X } from 'lucide-react';

// Define toast types
type ToastType = 'success' | 'error' | 'info';

// Define toast item structure
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Define context type
interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

// Create context with default values
const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

// Hook to use toast
export const useToast = () => useContext(ToastContext);

// Toast provider component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Individual toast component
const Toast = ({ toast, onClose }: { toast: ToastItem; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  // Determine background color based on type
  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-navy-800/90';
      case 'error':
        return 'bg-red-600/90';
      default:
        return 'bg-ink-800/90';
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-navy-700/30';
      case 'error':
        return 'border-red-300/30';
      default:
        return 'border-ink-300/20';
    }
  };

  return (
    <div 
      className={`${getBgColor()} ${getBorderColor()} backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg border pointer-events-auto max-w-md animate-fade-in-up`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-2">{toast.message}</div>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white focus:outline-none"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Add animation keyframes to index.css
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(1rem);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// .animate-fade-in-up {
//   animation: fadeInUp 0.3s ease-out forwards;
// }
