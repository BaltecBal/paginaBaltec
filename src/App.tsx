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
import { ToastProvider } from './components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <SEOHead />
      <div className="bg-paper min-h-screen">
        <Header />
        <Hero />
        <Services />
        <Problems />
        <About />
        <Clients />
        <Contact />
        <FAQ />
        <Footer />
        <WhatsAppFAB />
      </div>
    </ToastProvider>
  );
}

export default App;
