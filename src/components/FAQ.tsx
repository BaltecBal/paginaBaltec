import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué es el balanceo dinámico industrial?',
    a: 'El balanceo dinámico industrial es el proceso de corregir el desequilibrio de masas en piezas rotantes (rotores, impulsores, ejes, poleas) que genera vibración, ruido y desgaste prematuro. Se realiza midiendo y compensando las fuerzas centrífugas desiguales en uno o más planos, conforme a la norma ISO 21940 (ex ISO 1940-1). Un equipo correctamente balanceado opera con mayor eficiencia, menor consumo y vida útil extendida.',
  },
  {
    q: '¿En qué se diferencia el balanceo en banco del balanceo in situ?',
    a: 'El balanceo en banco se realiza en nuestro taller de CABA: el rotor se desmonta y se trabaja en una máquina equilibradora de alta precisión. Ofrece mayor exactitud y permite una inspección completa del equipo. El balanceo in situ se ejecuta directamente en planta, sin desmontar el equipo, reduciendo el tiempo de parada al mínimo. Baltec realiza ambas modalidades y recomienda la opción más adecuada según el tipo de equipo y la urgencia operativa.',
  },
  {
    q: '¿Qué tipos de equipos pueden balancearse o repararse?',
    a: 'Trabajamos con toda clase de maquinaria rotante industrial: ventiladores centrifugos y axiales, extractores e inyectores de aire, Unidades de Tratamiento de Aire (UTAs), bombas centrífugas y electrobombas, molinos industriales, compresores rotativos, agitadores, generadores y turbinas. Si su equipo no aparece en esta lista, consúltenos igualmente.',
  },
  {
    q: '¿Qué es la alineación láser y por qué es importante?',
    a: 'La alineación láser es el proceso de alinear con alta precisión los ejes y acoplamientos de equipos rotativos mediante tecnología láser. Un desalineamiento mínimo genera vibración, desgaste acelerado en rodamientos, sellos y acoplamientos, y mayor consumo energético. La alineación láser ofrece exactitud muy superior a los métodos tradicionales (regla, reloj comparador) y se verifica con informe técnico detallado.',
  },
  {
    q: '¿Cada cuánto hay que balancear una máquina rotante?',
    a: 'Se recomienda realizar un balanceo dinámico con cada reparación mayor (cambio de rodamientos, ejes, impulsores o paletas) y cada vez que aparezcan síntomas de vibración anormal, ruido o calentamiento en rodamientos. El análisis de vibraciones periódico permite determinar el momento óptimo de intervención antes de que se produzca una falla, reduciendo costos de mantenimiento no planificado.',
  },
  {
    q: '¿Bajo qué normas trabajan?',
    a: 'Todos nuestros trabajos de balanceo dinámico se realizan conforme a la norma ISO 21940 (anteriormente ISO 1940-1), que establece las tolerancias de calidad de balanceo para rotores rígidos. Para la evaluación de niveles de vibración en máquinas también aplicamos la norma ISO 10816. El cumplimiento de estas normas garantiza resultados reproducibles, verificables y alineados con estándares internacionales.',
  },
  {
    q: '¿Realizan trabajos en toda el AMBA?',
    a: 'Sí. Nuestro taller está ubicado en Nueva Pompeya, CABA. Realizamos servicios in situ en toda el Área Metropolitana de Buenos Aires (AMBA): zona norte (Pilar, Tigre, Malvinas Argentinas, Don Torcuato), zona oeste (Moreno, La Matanza, Luján), zona sur (Avellaneda, Lanús, Quilmes, Berazategui) y el corredor industrial Zárate-Campana. Consulte disponibilidad para su ubicación.',
  },
  {
    q: '¿Qué incluye el servicio de reparación de UTAs?',
    a: 'Las Unidades de Tratamiento de Aire (UTAs) se reparan en su totalidad en sitio (INSITU) dado que su desmontaje es complejo. El servicio incluye: extracción de ejes en turbinas y provisión de componentes, cambio de rodamientos, cambio de motor, alineación láser, balanceo dinámico INSITU según norma ISO 21940 y control de vibración final. Se emite informe técnico de cada intervención.',
  },
  {
    q: '¿Cuánto tiempo lleva un servicio de balanceo in situ?',
    a: 'Depende del tipo y tamaño del equipo. Un balanceo dinámico in situ de un ventilador o extractor industrial típicamente se completa en 4 a 8 horas de trabajo en planta, sin necesidad de desmontar el equipo. Coordinamos los trabajos para minimizar las paradas de producción y atendemos urgencias con disponibilidad rápida.',
  },
  {
    q: '¿Cómo solicitar un presupuesto?',
    a: 'Puede contactarnos por teléfono al 011 4919-9922, por WhatsApp al 15 3574-4732 o mediante el formulario de contacto de esta página. Atendemos de lunes a viernes de 8:00 a 12:00 y de 13:00 a 17:00. Para urgencias respondemos el mismo día.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const existing = document.getElementById('schema-faq');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'schema-faq';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(script);
    return () => { document.getElementById('schema-faq')?.remove(); };
  }, []);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="preguntas-frecuentes" className="py-12 md:py-24" style={{ background: 'var(--ink-50)' }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="max-w-[820px] mx-auto">
          <span className="eyebrow"><span>Preguntas frecuentes</span></span>
          <h2 className="display-3 text-navy-900 mt-6 mb-10">
            Todo lo que necesita saber sobre balanceo dinámico industrial.
          </h2>

          <div className="divide-y divide-ink-200 border-t border-ink-200">
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                  >
                    <span
                      className="font-semibold text-navy-900 text-[15px] md:text-[17px] leading-snug group-hover:text-navy-700 transition-colors"
                      style={{ fontFamily: 'var(--f-sans)' }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className="flex-shrink-0 w-5 h-5 text-ink-300 mt-0.5 transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-6 text-ink-500 text-[14px] md:text-[15px] leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
