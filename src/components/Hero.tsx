const stats = [
  { num: '40+', label: 'Años de operación' },
  { num: 'INSITU', label: 'Balanceo en planta' },
  { num: 'ISO', label: 'Norma ISO 21940' },
  { num: 'CABA', label: 'Nueva Pompeya, Argentina' },
];

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden pt-20"
      style={{ background: 'var(--navy-900)' }}
    >
      {/* Bottom-left radial glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute bottom-0 left-0 w-[900px] h-[900px] md:w-[1800px] md:h-[1800px]"
          style={{
            background:
              'radial-gradient(circle at 0% 100%, rgba(61,107,200,0.55) 0%, rgba(29,60,128,0.2) 35%, transparent 60%)',
            filter: 'blur(60px)',
            transform: 'translate(-15%, 25%)',
          }}
        />
      </div>

      {/* Subtle noise/grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-start">

        {/* Triangle image — inside content div, bounded above stats strip */}
        <div
          className="hero-triangle absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <picture>
            <source srcSet="/hero-extractor.webp" type="image/webp" />
            <img
              src="/hero-extractor.jpg"
              alt=""
              decoding="async"
              fetchPriority="low"
              className="absolute inset-0 w-full h-full object-cover [filter:blur(1.5px)] md:[filter:none] [object-position:70%_center] md:[object-position:center]"
              style={{ opacity: 0.55 }}
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(120deg, var(--navy-900) 0%, transparent 50%)' }}
          />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 pt-8 pb-6 md:py-16 w-full">
          <div className="max-w-[1100px]">
            {/* Geo eyebrow — visible to Google, positioned above H1 */}
            <p
              className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase"
              style={{ color: '#677699' }}
            >
              CABA · Buenos Aires · Argentina
            </p>

            <h1
              className="mt-3 font-bold tracking-[-0.03em] leading-[1.02]"
              style={{
                fontFamily: 'var(--f-sans)',
                fontSize: 'clamp(28px, 7vw, 76px)',
              }}
            >
              <span className="block text-white">Balanceo dinámico industrial.</span>
              <span className="block mt-1" style={{ color: '#677699' }}>
                Precisión en cada rotación.
              </span>
            </h1>

            <p className="body-lg mt-8 max-w-[560px]" style={{ color: '#a0abc1' }}>
              Balanceo dinámico en banco e in situ, reparación de equipos rotativos, alineación láser y análisis de vibraciones. Servicio en CABA y AMBA.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={() => scrollTo('servicios')} className="btn btn-light">
                Nuestros servicios <span className="arrow">→</span>
              </button>
              <button onClick={() => scrollTo('contacto')} className="btn btn-ghost-dark">
                Contacto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.num}
                className={`py-6 md:py-8 ${i < stats.length - 1 ? 'md:border-r' : ''} ${
                  i % 2 === 0 ? 'border-r md:border-r' : ''
                } ${i < 2 ? 'border-b md:border-b-0' : ''} border-white/10 px-4 md:px-8`}
              >
                <div
                  className="text-white font-bold text-[28px] md:text-[40px] leading-none tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--f-sans)' }}
                >
                  {stat.num}
                </div>
                <div className="font-mono text-[9px] md:text-[11px] tracking-[0.15em] uppercase text-white/50 mt-3 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
