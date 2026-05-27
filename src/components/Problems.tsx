const problems = [
  {
    title: 'Paradas de planta por vibración',
    desc: 'Un equipo fuera de servicio detiene la producción. Respondemos rápido.',
  },
  {
    title: 'Fallas repetitivas en equipos rotativos',
    desc: 'Si el equipo falla seguido, hay un problema de raíz. Lo diagnosticamos.',
  },
  {
    title: 'Desgaste prematuro de rodamientos y ejes',
    desc: 'Rodamientos, ejes y sellos que no duran. Lo corregimos en el origen.',
  },
  {
    title: 'Pérdida de eficiencia por vibraciones mecánicas',
    desc: 'Vibraciones, ruidos, consumo elevado. Detectamos la causa antes de que escale.',
  },
];

const Problems = () => {
  return (
    <section style={{ background: 'var(--ink-50)' }} className="border-y border-ink-200" aria-label="Problemas que resolvemos">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`py-8 px-4 md:px-8 ${
                i < problems.length - 1 ? 'border-b sm:border-b md:border-b-0 md:border-r border-ink-200' : ''
              } ${i % 2 === 0 && i < problems.length - 1 ? 'sm:border-r sm:border-ink-200' : ''}`}
            >
              <div
                className="w-6 h-0.5 mb-4"
                style={{ background: 'var(--accent)' }}
              />
              <h3 className="h3 text-navy-900">{p.title}</h3>
              <p className="caption text-ink-500 mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
