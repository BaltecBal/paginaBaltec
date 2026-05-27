import { useState } from 'react';

const services = [
  {
    n: '01',
    short: 'Extractores e inyectores',
    mobile: 'Extractores',
    long: 'Reparación y balanceo dinámico de extractores e inyectores de aire',
    bullets: [
      'Reparación completa según lo requiera el equipo',
      'Desmontaje, montaje, reparación y fabricación de ejes',
      'Control de excentricidad, colocación y ajuste de rodamientos',
      'Fabricación de poleas, alineación láser y puesta en marcha',
      'Balanceo dinámico in situ según norma ISO 21940 y análisis de vibraciones',
    ],
    image: '/servicios/extractor',
  },
  {
    n: '02',
    short: 'Unidades de tratamiento de aire',
    mobile: 'UTA',
    long: 'Reparación y balanceo dinámico de UTAs — Unidades de Tratamiento de Aire',
    bullets: [
      'Trabajo INSITU por complejidad de desmontaje y montaje',
      'Extracción de ejes en turbinas, provisión de componentes',
      'Montajes, ajustes de rodamientos, cambios en motor, alineación láser',
      'Balanceo dinámico INSITU según norma ISO 21940 y control de vibración final',
    ],
    image: '/servicios/uta',
  },
  {
    n: '03',
    short: 'Bombas de agua',
    mobile: 'Bombas',
    long: 'Reparación y balanceo dinámico de bombas centrífugas y electrobombas',
    bullets: [
      'Desmontaje y montaje de bombas, motores y electrobombas',
      'Control de excentricidad, anillos de compulsión y rodamientos',
      'Provisión de empaquetaduras, sellos mecánicos y modificaciones',
      'Balanceo dinámico de partes rotantes, montaje y análisis de vibraciones',
    ],
    image: '/servicios/bombas-agua',
  },
  {
    n: '04',
    short: 'Molinos industriales',
    mobile: 'Molinos',
    long: 'Reparación y balanceo dinámico de molinos industriales',
    bullets: [
      'Cambio y mecanizado de ejes en taller e INSITU',
      'Reconstrucción completa de equipos rotativos industriales',
      'Colocación y ajuste de rodamientos de alta precisión',
      'Balanceo dinámico post-reparación según ISO 21940 y análisis de vibraciones',
    ],
    image: '/servicios/molinos',
  },
  {
    n: '05',
    short: 'Alineación láser',
    mobile: 'Alineación',
    long: 'Alineación láser de ejes y acoplamientos industriales',
    bullets: [
      'Alineación de precisión entre ejes y acoplamientos con tecnología láser',
      'Mayor exactitud que métodos tradicionales, mínimo margen de error',
      'Reducción de desgaste prematuro en rodamientos, sellos y acoplamientos',
      'Verificación post-alineación con informe técnico detallado',
    ],
    image: '/servicios/laser',
  },
];

const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = services[activeIdx];

  return (
    <section id="servicios" className="py-12 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <h2 className="display-3 text-navy-900 mb-8 md:mb-12">
          Servicios de balanceo dinámico y reparación de equipos rotativos.
        </h2>

        {/* Tab strip — 3 cols mobile (2 rows), 6 cols desktop */}
        <div className="grid grid-cols-6 md:grid-cols-5 border border-ink-200 border-b-0 bg-white">
          {services.map((s, i) => (
            <button
              key={s.n}
              onClick={() => !s.future && setActiveIdx(i)}
              className={`service-tab ${i === activeIdx ? 'active' : ''} ${s.future ? 'future' : ''} ${i < 3 ? 'col-span-2 md:col-span-1' : 'col-span-3 md:col-span-1'}`}
              role="tab"
              aria-selected={i === activeIdx}
              tabIndex={s.future ? -1 : 0}
            >
              <span className="label text-xs md:text-sm leading-tight">
                <span className="md:hidden">{s.mobile ?? s.short}</span>
                <span className="hidden md:inline">{s.short}</span>
              </span>
              {s.future && (
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-300 hidden md:inline">
                  Próximamente
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {!active.future && (
          <div className="grid grid-cols-1 md:grid-cols-2 border border-ink-200">
            {/* Photo stack — all images mounted & decoded; switching = opacity only (instant, no fetch/decode lag) */}
            <div className="relative bg-ink-100 aspect-[16/9] md:aspect-auto md:min-h-[480px] overflow-hidden">
              {services.map((s, i) => {
                const isActive = i === activeIdx;
                return s.image ? (
                  <picture key={s.n}>
                    <source srcSet={`${s.image}.webp`} type="image/webp" />
                    <img
                      src={`${s.image}.jpg`}
                      alt={s.long}
                      loading="eager"
                      decoding="async"
                      fetchPriority={isActive ? 'high' : 'low'}
                      aria-hidden={!isActive}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
                      style={{ opacity: isActive ? 1 : 0 }}
                    />
                  </picture>
                ) : (
                  <div
                    key={s.n}
                    aria-hidden={!isActive}
                    className="absolute inset-0 flex items-end p-8 transition-opacity duration-300 ease-out"
                    style={{ background: 'var(--navy-800)', opacity: isActive ? 1 : 0 }}
                  >
                    <span className="font-bold text-white/10 text-[80px] md:text-[120px] leading-none tracking-[-0.04em]">
                      {s.n}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-6 md:p-12 flex flex-col">
              <h3 className="h2 md:h1 text-navy-900">{active.long}</h3>

              <div className="mt-5 flex-1">
                {active.bullets.map((b, i) => (
                  <div key={i} className="bullet">
                    <span className="bullet-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="bullet-text">{b}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* CTA banner — full width below panel */}
        <div className="mt-4 border border-ink-200">
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 px-5 py-4"
            style={{ background: 'var(--navy-800)' }}
          >
            <span className="text-sm text-white">
              ¿Necesita balanceo dinámico o reparación de otro equipo rotante?
            </span>
            <a
              href="#contacto"
              className="btn btn-light flex-shrink-0 justify-center sm:justify-start"
              style={{ padding: '10px 20px', fontSize: '13px' }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solicitar presupuesto <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
