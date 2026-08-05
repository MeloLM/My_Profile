'use client';
export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/393510845851?text=Ciao%20Carmelo,%20vorrei%20salvare%20il%20tuo%20contatto."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattami su WhatsApp"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '90px',
        width: '56px',
        height: '56px',
        backgroundColor: '#25D366',
        color: '#FFF',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '28px',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
        zIndex: 999,
        transition: 'transform 0.3s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
}
