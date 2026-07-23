import { useSiteData } from '../context/SiteDataContext';

// Bouton WhatsApp flottant — canal de contact n°1 au Bénin.
export default function WhatsAppButton() {
  const { contact } = useSiteData();
  const base = contact?.whatsapp || 'https://wa.me/2290160293043';
  const message = encodeURIComponent(
    "Bonjour Josué 👋 Je viens de votre portfolio, j'aimerais discuter d'un projet."
  );
  const href = `${base}${base.includes('?') ? '&' : '?'}text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 hover:gap-3 rounded-full shadow-lg transition-all duration-300"
      style={{ background: '#25D366', color: '#04231a', padding: '14px' }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.03 3C9.4 3 4 8.4 4 15.03c0 2.35.67 4.55 1.84 6.42L4 29l7.74-1.8a12 12 0 0 0 4.29.8h.01C22.66 28 28 22.6 28 15.97 28 9.34 22.66 3 16.03 3Zm7.03 16.97c-.3.84-1.74 1.6-2.42 1.66-.62.06-1.4.09-2.27-.14-.52-.14-1.2-.36-2.06-.72-3.63-1.57-6-5.2-6.18-5.44-.18-.24-1.48-1.96-1.48-3.74 0-1.78.94-2.65 1.27-3.02.33-.36.72-.45.96-.45.24 0 .48 0 .69.01.22.01.52-.08.81.62.3.72 1.02 2.5 1.11 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.38-.16.74.21.36.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.21 1.71Z"/>
      </svg>
      <span className="max-w-0 group-hover:max-w-[180px] overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300">
        Discutons sur WhatsApp
      </span>
    </a>
  );
}
