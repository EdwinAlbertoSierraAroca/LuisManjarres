import type { SVGProps } from 'react';

export const whatsappMessage = 'Hola, PROSOINPEN S.A.S. Estoy interesado(a) en una solución de ingeniería o energía fotovoltaica y quisiera recibir asesoría sobre mi proyecto.\n¿Podemos conversar?';
export const whatsappUrl = `https://api.whatsapp.com/send?phone=573112167711&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <path fill="#fff" d="M22.2 18.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.8 4.3 2.8 1.2 2.8.8 3.3.8.5 0 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
      <path fill="#fff" d="M16 7.1a8.9 8.9 0 0 0-7.6 13.6L7.1 24.9l4.3-1.2A8.9 8.9 0 1 0 16 7.1Zm0 16.4a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.5.7.7-2.4-.2-.3A7.5 7.5 0 1 1 16 23.5Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Contactar a PROSOINPEN por WhatsApp">
      <span className="whatsapp-float__brand">
        <img
          src="/logo-prosoinpen.svg"
          alt="PROSOINPEN"
          className="whatsapp-float__logo"
        />
        <span>P</span>
      </span>
      <WhatsAppIcon className="whatsapp-float__icon" />
      <span className="whatsapp-float__label">WhatsApp</span>
    </a>
  );
}
