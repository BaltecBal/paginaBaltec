const milestones = [
  {
    year: '1985',
    title: 'Fundación',
    text: 'Como Fantasía De Paryam, en Lanús, Buenos Aires.',
  },
  {
    year: '2002',
    title: 'Rebrand',
    text: 'Adoptamos el nombre Baltec y expandimos servicios.',
  },
  {
    year: '2010+',
    title: 'Especialización',
    text: 'Foco completo en máquinas rotantes industriales.',
  },
  {
    year: 'Hoy',
    title: 'Referentes',
    text: 'Industria, banca, salud y telecomunicaciones.',
  },
];

const About = () => {
  return (
    <section id="nosotros">

      {/* Top — navy blue */}
      <div className="py-12 md:py-24" style={{ background: 'var(--navy-900)' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h2 className="display-3 text-white mt-6">
                40 años de oficio en balanceo dinámico industrial.
              </h2>
              <p className="body-lg text-white/50 mt-4">Cada trabajo, una garantía.</p>
            </div>

            <div className="space-y-5 md:pt-12">
              <p className="body text-white/70">
                Los comienzos de <strong className="text-white">Baltec</strong> fueron en 1985 en
                Lanús, Buenos Aires, bajo el nombre Fantasía De Paryam. Desde entonces, nos dedicamos
                exclusivamente al balanceo dinámico en taller e insitu de equipos rotativos industriales.
              </p>
              <p className="body text-white/70">
                En 2002 adoptamos el nombre <strong className="text-white">Baltec</strong>,
                expandiendo nuestros servicios a reparaciones mecánicas integrales de bombas,
                extractores, UTAs y molinos industriales. Con taller en CABA, atendemos clientes
                en todo el AMBA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline — light */}
      <div style={{ background: 'var(--ink-50)' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="border-x border-ink-200">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`p-5 md:p-10 border-b border-ink-200 ${
                    i % 2 === 0 ? 'border-r border-ink-200' : ''
                  } md:border-b-0 ${i < milestones.length - 1 ? 'md:border-r border-ink-200' : ''}`}
                >
                  <div className="font-bold text-[28px] md:text-[56px] leading-none tracking-[-0.03em] text-navy-900">
                    {m.year}
                  </div>
                  <div className="text-sm md:text-xl font-semibold text-navy-900 mt-2">{m.title}</div>
                  <p className="text-[11px] md:text-[13px] text-ink-500 mt-1 leading-snug">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — mobile: reduce padding */}

      {/* Bottom — Nuestro Objetivo, centered (no photo), light */}
      <div className="py-12 md:py-24" style={{ background: 'var(--ink-50)' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="max-w-[820px] mx-auto text-center">
            <span className="eyebrow">
              <span>Nuestro Objetivo</span>
            </span>
            <h3 className="h1 text-navy-900 mt-6">
              Realizar trabajos a <em className="underline-hand-blue">conciencia</em>, guiados por normas y tolerancias mecánicas para un
              funcionamiento óptimo.
            </h3>
            <p className="body text-ink-500 mt-6">
              Lo principal es satisfacer a nuestros clientes, brindando garantía de nuestro trabajo.
              Todos los balanceos se realizan bajo normas <strong>ISO 21940</strong> (ex ISO 1940-1)
              y tolerancias mecánicas estrictas.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
