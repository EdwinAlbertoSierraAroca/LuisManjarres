'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

const navGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: '◫' },
      { name: 'Resumen', href: '/dashboard#resumen', icon: '◭' },
    ],
  },
  {
    title: 'Empresa',
    items: [
      { name: 'Empresa', href: '/empresa', icon: '◎' },
      { name: 'Servicios', href: '/servicios', icon: '▣' },
      { name: 'Proyectos', href: '/proyectos', icon: '◧' },
    ],
  },
  {
    title: 'Operación',
    items: [
      { name: 'Clientes', href: '/clientes', icon: '◌' },
      { name: 'Cotizaciones', href: '/cotizaciones', icon: '✦' },
      { name: 'Leads', href: '/leads', icon: '◍' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { name: 'Analytics', href: '/analytics', icon: '◔' },
      { name: 'Brand Studio', href: '/brand-studio', icon: '✧' },
    ],
  },
];

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(navGroups[0]?.title ?? 'Overview');

  const isActiveItem = (href: string) => {
    const baseHref = href.split('#')[0];
    return pathname === href || pathname === baseHref || pathname.startsWith(baseHref);
  };

  const activeGroup = navGroups.find((group) => group.items.some((item) => isActiveItem(item.href)))?.title ?? navGroups[0]?.title ?? 'Overview';

  const handleGroupToggle = (groupTitle: string) => {
    setOpenGroup((current) => {
      if (current === groupTitle) {
        return activeGroup;
      }
      return groupTitle;
    });
  };

  return (
    <div className="dashboard-shell min-h-screen">
      <div className="sidebar-backdrop" data-open={mobileOpen} onClick={() => setMobileOpen(false)} />

      <div className="mx-auto max-w-[1480px] px-3 py-4 md:px-6 lg:px-8">
        <div className="dashboard-frame">
          <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <Link href="/dashboard" className="brand-lockup" onClick={() => setMobileOpen(false)}>
                <div className="brand-mark">S</div>
                <div>
                  <div className="brand-label">Solar</div>
                  <div className="brand-name">STUDIO</div>
                </div>
              </Link>
            </div>

            <nav className="sidebar-nav" aria-label="Navegación principal">
              {navGroups.map((group) => {
                const isOpen = openGroup === group.title;
                return (
                  <div key={group.title} className="accordion-group">
                    <button
                      type="button"
                      className="accordion-trigger"
                      onClick={() => handleGroupToggle(group.title)}
                    >
                      <span>{group.title}</span>
                      <span className={`accordion-caret ${isOpen ? 'open' : ''}`}>⌃</span>
                    </button>

                    {isOpen && (
                      <div className="accordion-panel">
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`menu-item ${isActiveItem(item.href) ? 'active' : ''}`}
                          >
                            <span className="menu-icon">{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <div className="mini-panel">
                <div>
                  <div className="mini-panel__label">Operación</div>
                  <div className="mini-panel__value">24/7</div>
                </div>
                <span className="mini-panel__dot" />
              </div>
            </div>
          </aside>

          <div className="content-panel">
            <header className="topbar">
              <div className="topbar-left">
                <button
                  type="button"
                  className="mobile-menu-button"
                  aria-label="Abrir menú"
                  onClick={() => setMobileOpen((value) => !value)}
                >
                  ☰
                </button>
                <div>
                  <p className="eyebrow">Panel general</p>
                  <h1>{title}</h1>
                </div>
              </div>

              <div className="topbar-actions">
                <button type="button" className="secondary-btn subtle">Filtrar</button>
                <button type="button" className="primary-btn">Nuevo proyecto</button>
              </div>
            </header>

            {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}

            <main className="content-body">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
