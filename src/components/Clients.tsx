const clients = [
  { name: 'Acindar', image: '/clientes/acindar.png' },
  { name: 'Amesud', image: '/clientes/amesud.png' },
  { name: 'Asofarma', image: '/clientes/asofarma.png' },
  { name: 'Banco Nación', image: '/clientes/bna.png' },
  { name: 'Coto', image: '/clientes/coto.png' },
  { name: 'Telecom', image: '/clientes/telecom.png' },
];

const Clients = () => {
  return (
    <section id="clientes" className="py-24" style={{ background: 'var(--navy-900)' }} aria-label="Clientes de Balanceo Baltec SRL">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
          <div>
            <h2 className="display-3 text-white mt-6">
              Confianza de empresas <em className="underline-hand-white">líderes en Argentina.</em>
            </h2>
          </div>
          <p className="body-lg text-ink-300 md:max-w-md">
            Más de 40 años trabajando con referentes de la industria metalúrgica, farmacéutica,
            alimentaria, banca y telecomunicaciones en Argentina.
          </p>
        </div>
      </div>

      {/* Full-bleed carousel — breaks out of container on desktop */}
      <div className="relative overflow-hidden w-full">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--navy-900), transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--navy-900), transparent)' }}
        />

        <div className="flex animate-scroll" style={{ width: 'fit-content' }}>
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-shrink-0 w-[140px] md:w-[260px] lg:w-[300px] h-28 md:h-40 mx-3 md:mx-10 lg:mx-12"
            >
              <img
                src={client.image}
                alt={client.name}
                className="h-20 md:h-28 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Clients;
