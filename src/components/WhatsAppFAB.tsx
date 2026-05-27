const WhatsAppFAB = () => {
  const handleClick = () => {
    const phoneNumber = '5491535744732';
    const message = encodeURIComponent('Hola quiero hacer una consulta.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full flex items-center justify-center z-50 transition-transform duration-200 hover:scale-110"
      style={{ background: 'var(--whatsapp)', boxShadow: '-3px 2px 10px rgba(0,0,0,0.35)' }}
      aria-label="Contactar por WhatsApp"
    >
      <img
        src="/icons/whatsapp-logo.svg"
        alt="WhatsApp"
        className="w-8 h-8"
        style={{ filter: 'invert(1)' }}
      />
    </button>
  );
};

export default WhatsAppFAB;
