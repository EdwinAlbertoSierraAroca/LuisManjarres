'use client';

import { useEffect, useState } from 'react';

export type SiteTheme = 'marca' | 'solar';
export const THEME_STORAGE_KEY = 'ps-theme';

const LABELS: Record<SiteTheme, string> = { marca: 'Tema marca', solar: 'Tema solar' };

/** Alterna entre el tema de marca (predeterminado) y el tema solar original. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<SiteTheme>('marca');

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === 'marca' || current === 'solar') setTheme(current);
  }, []);

  function toggle() {
    const next: SiteTheme = theme === 'marca' ? 'solar' : 'marca';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento disponible: el cambio aplica solo a esta visita.
    }
    setTheme(next);
  }

  const other: SiteTheme = theme === 'marca' ? 'solar' : 'marca';
  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className}`.trim()}
      aria-label={`Cambiar a ${LABELS[other].toLowerCase()}`}
      title={`Cambiar a ${LABELS[other].toLowerCase()}`}
    >
      <span className={`theme-toggle__swatch theme-toggle__swatch--${theme}`} aria-hidden="true" />
      <span>{LABELS[theme]}</span>
    </button>
  );
}
