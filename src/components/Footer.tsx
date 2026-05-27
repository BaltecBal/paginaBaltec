import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--navy-900)' }} className="pt-12 md:pt-16 pb-8" aria-label="Pie de página Balanceo Baltec">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* Mobile: compact 2-row layout. Desktop: 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <img src="/baltec.png" alt="Baltec" className="h-10 md:h-12 w-auto mb-3" />
            <p className="text-sm text-ink-300 leading-relaxed">
              Especialistas en balanceo dinámico industrial con más de 40 años de experiencia.
            </p>
          </div>

          {/* Nav — hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-ink-300 mb-6">
              Navegación
            </h3>
            <div className="flex flex-col gap-3">
              {['Inicio', 'Servicios', 'Nosotros', 'Clientes', 'Contacto'].map(label => (
                <button
                  key={label}
                  onClick={() => scrollToSection(label.toLowerCase())}
                  className="text-left text-white/70 hover:text-white transition-colors text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact — compact on mobile */}
          <address className="not-italic" aria-label="Información de contacto de Balanceo Baltec">
            <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-ink-300 mb-4 md:mb-6">
              Contacto
            </h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="tel:+541149199922"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-ink-300 flex-shrink-0" />
                <span>011 4919-9922</span>
              </a>
              <a
                href="https://wa.me/5491535744732"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-ink-300 flex-shrink-0" />
                <span>15 3574-4732</span>
              </a>
              <a
                href="mailto:info@balanceobaltec.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-ink-300 flex-shrink-0" />
                <span className="break-all">info@balanceobaltec.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-ink-300 mt-0.5 flex-shrink-0" />
                <span>
                  Av. Del Barco Centenera 3405, Buenos Aires
                </span>
              </div>
              <div className="flex items-start gap-3 text-white/70">
                <Clock className="w-4 h-4 text-ink-300 mt-0.5 flex-shrink-0" />
                <span>Lun-Vie · 8:00-12:00 y 13:00-17:00</span>
              </div>
            </div>
          </address>
        </div>

        <div className="border-t border-white/10 mt-10 md:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">
            © {currentYear} Balanceo Baltec S.R.L. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
            Buenos Aires · Argentina
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
