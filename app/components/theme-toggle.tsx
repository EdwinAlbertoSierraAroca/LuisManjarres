'use client';

import { useEffect, useState } from 'react';

export type SiteTheme = 'marca' | 'solar' | 'terracota';
export const THEME_STORAGE_KEY = 'ps-theme';

const ORDER: SiteTheme[] = ['marca', 'solar', 'terracota'];
const LABELS: Record<SiteTheme, string> = { marca: 'Tema marca', solar: 'Tema solar', terracota: 'Tema terracota' };

/** Recorre los tres temas: marca (predeterminado) → solar (carbón) → terracota (café). */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<SiteTheme>('marca');

  useEffect(() => {
    const current = document.documentElement.dataset.theme as SiteTheme | undefined;
    if (current && ORDER.includes(current)) setTheme(current);
  }, []);

  const next: SiteTheme = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento disponible: el cambio aplica solo a esta visita.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className}`.trim()}
      aria-label={`${LABELS[theme]}. Cambiar a ${LABELS[next].toLowerCase()}`}
      title={`Cambiar a ${LABELS[next].toLowerCase()}`}
    >
      <span className={`theme-toggle__swatch theme-toggle__swatch--${theme}`} aria-hidden="true" />
      <span>{LABELS[theme]}</span>
    </button>
  );
}
