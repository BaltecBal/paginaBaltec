import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { useToast } from './ui/Toast';

const EMAILJS_SERVICE_ID = 'emailjs_forms';
const EMAILJS_TEMPLATE_ID = 'template_s7fqr6b';
const EMAILJS_PUBLIC_KEY = '31JqmeM3-S02DDXwh';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      showToast('Por favor, verifique que no es un robot', 'error');
      return;
    }
    if (!formRef.current) {
      showToast('No se pudo procesar el formulario. Intente nuevamente.', 'error');
      return;
    }
    setIsSubmitting(true);
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
        setFormData({ name: '', email: '', message: '' });
        formRef.current?.reset();
        setCaptchaVerified(false);
      })
      .catch((error: unknown) => {
        console.error('EmailJS error:', error);
        showToast('Hubo un problema al enviar el mensaje. Intente nuevamente.', 'error');
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setCaptchaVerified(false);
    setIsSubmitting(false);
  }, []);

  const contactInfo = [
    { icon: Phone, label: 'Teléfono', value: '011 4919-9922' },
    { icon: MessageSquare, label: 'WhatsApp Administración', value: '15 3574-4732' },
    { icon: MessageSquare, label: 'WhatsApp Ventas', value: '11 4979-7144' },
    { icon: Mail, label: 'Email', value: 'info@balanceobaltec.com' },
    { icon: MapPin, label: 'Dirección', value: 'Av. Del Barco Centenera 3405, Buenos Aires' },
    { icon: Clock, label: 'Horario', value: 'Lunes a Viernes · 8:00-12:00 y 13:00-17:00' },
  ];

  return (
    <section id="contacto" className="py-24" style={{ background: 'var(--ink-50)' }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <h2 className="display-3 text-navy-900 mb-12">
          Hablemos de su <em className="underline-hand-blue">proyecto.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="name" className="field-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="field-input"
                    placeholder="Su nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="field-input"
                    placeholder="su.email@ejemplo.com"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="field-label">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="field-input field-textarea"
                  placeholder="Tipo de equipo, urgencia, detalles…"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <label className="inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={captchaVerified}
                    onChange={() => setCaptchaVerified(true)}
                  />
                  <div className="relative w-11 h-6 bg-ink-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-ink-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-800" />
                  <div className="flex items-center ml-3 gap-2 text-ink-500">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-sm">No soy un robot</span>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="text-navy-800 mt-1 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-500 mb-1">
                    {label}
                  </div>
                  <div className="body text-ink-800 whitespace-nowrap">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="border-2 border-navy-800 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0162398078064!2d-58.4197444!3d-34.6542928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb085f68e3af%3A0x9d865f5bb08652ec!2sBalanceo%20Din%C3%A1mico%20Baltec%20SRL!5e0!3m2!1ses-419!2sar!4v1756749815894!5m2!1ses-419!2sar&z=16"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Balanceo Dinámico Baltec SRL"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
