import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useHashRoute, isInsideProductos, PRODUCTOS_LINK, navigateProductos } from '../lib/router';
import { safeScrollToId } from '../lib/nav';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'productos', label: 'Productos', isRoute: true },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'contacto', label: 'Contacto' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);

  const route = useHashRoute();
  const onProductos = isInsideProductos(route);

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (onProductos) {
      // Going to home: clear hash and let the new page mount
      window.location.hash = '';
      // The home page uses the same onMount scrollToTop; user then scrolls naturally
    } else {
      safeScrollToId('inicio', route);
    }
  };

  const handleNavClick = (item: typeof NAV_ITEMS[number]) => {
    if (item.isRoute) {
      setIsMenuOpen(false);
      navigateProductos();
      return;
    }
    safeScrollToId(item.id, route, { onMobileMenuClose: () => setIsMenuOpen(false) });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      // Only update active section when on home page
      if (onProductos) return;

      const sections = NAV_ITEMS.filter((i) => !i.isRoute).map((i) => i.id);
      const scrollPosition = window.scrollY + 300;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onProductos]);

  const isItemActive = (item: typeof NAV_ITEMS[number]) => {
    if (item.isRoute) return onProductos;
    return !onProductos && activeSection === item.id;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'border-white/10 backdrop-blur-md'
          : 'border-transparent'
      }`}
      style={{
        background: scrolled ? 'rgba(20, 45, 99, 0.92)' : 'var(--navy-900)',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo + divider + tagline */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="Baltec — Inicio"
          >
            <img src="/baltec.png" alt="Baltec" className="h-9 md:h-10 w-auto" />
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/60 border-l border-white/20 pl-3 leading-tight">
              Balanceo
              <br />
              Industrial
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = isItemActive(item);
              if (item.isRoute) {
                return (
                  <a
                    key={item.id}
                    href={PRODUCTOS_LINK}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-4 right-4 h-0.5"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                  </a>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-4 right-4 h-0.5"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </button>
              );
            })}

            {/* Presupuesto CTA */}
            <button
              onClick={() => handleNavClick({ id: 'contacto' } as typeof NAV_ITEMS[number])}
              className="ml-4 btn btn-ghost-dark"
            >
              Presupuesto <span className="arrow">→</span>
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10" style={{ background: 'var(--navy-900)' }}>
          <div className="max-w-[1320px] mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isItemActive(item);
              if (item.isRoute) {
                return (
                  <a
                    key={item.id}
                    href={PRODUCTOS_LINK}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                    className={`text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                handleNavClick({ id: 'contacto' } as typeof NAV_ITEMS[number]);
              }}
              className="mt-2 btn btn-light w-full justify-center"
            >
              Solicitar presupuesto <span className="arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;