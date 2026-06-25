import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Services from './components/Services';
import About from './components/About';
import FAQ from './components/FAQ';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import SEOHead from './components/SEOHead';
import Productos from './components/Productos';
import ProductosCategory from './components/ProductosCategory';
import CartSidebar from './components/CartSidebar';
import CartBanner from './components/CartBanner';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';
import { CartProvider } from './lib/cart';
import {
  useHashRoute,
  isProductosIndex,
  isProductosCategory,
} from './lib/router';

function App() {
  const route = useHashRoute();
  const onProductosIndex = isProductosIndex(route);
  const { isCategory, categoryId } = isProductosCategory(route);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <CartProvider>
          <SEOHead />
          <div className="bg-paper min-h-screen">
            <Header />
            {onProductosIndex ? (
              <Productos />
            ) : isCategory ? (
              <ProductosCategory categoryId={categoryId} />
            ) : (
              <>
                <Hero />
                <Services />
                <Problems />
                <About />
                <Clients />
                <Contact />
                <FAQ />
              </>
            )}
            <Footer />
            <WhatsAppFAB />
            <CartSidebar />
            <CartBanner />
          </div>
        </CartProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
