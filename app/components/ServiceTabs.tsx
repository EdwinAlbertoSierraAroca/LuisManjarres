'use client';

import { useState } from 'react';

type Tab = { id: string; icon: string; label: string; intro: string; items: Array<{ title: string; text: string }> };

const TABS: Tab[] = [
  {
    id: 'fotovoltaica',
    icon: '☀️',
    label: 'Soluciones fotovoltaicas',
    intro: 'Diseñamos el tipo de sistema solar que mejor se adapta a tu consumo, a tu ubicación y a la disponibilidad de la red.',
    items: [
      { title: 'On-Grid (conectado a la red)', text: 'Reduce tu factura y entrega excedentes a la red pública bajo la CREG 174 de 2021.' },
      { title: 'Off-Grid (aislado con baterías)', text: 'Energía propia donde no llega la red: fincas, veredas y zonas no interconectadas.' },
      { title: 'Híbridos', text: 'Conexión a la red con respaldo en baterías de litio para continuidad ante cortes.' },
    ],
  },
  {
    id: 'ingenieria',
    icon: '⚡',
    label: 'Ingeniería eléctrica y obras civiles',
    intro: 'Infraestructura eléctrica y civil ejecutada por personal técnico calificado, bajo la norma RETIE.',
    items: [
      { title: 'Subestaciones', text: 'Diseño, montaje y puesta en marcha de subestaciones eléctricas.' },
      { title: 'Redes de media y baja tensión', text: 'Construcción, adecuación y mantenimiento de redes eléctricas.' },
      { title: 'Sistemas de puesta a tierra', text: 'Diseño e instalación para la protección de personas y equipos.' },
      { title: 'Adecuación de techos y cubiertas', text: 'Refuerzo estructural, impermeabilización y obras civiles complementarias.' },
    ],
  },
  {
    id: 'eficiencia',
    icon: '📊',
    label: 'Eficiencia energética y auditorías',
    intro: 'Identificamos dónde se pierde energía y cómo reducir costos antes y después de invertir en energía solar.',
    items: [
      { title: 'Estudios de calidad de potencia', text: 'Medición y análisis de armónicos, factor de potencia y variaciones de tensión para empresas.' },
      { title: 'Auditorías energéticas', text: 'Diagnóstico del consumo y recomendaciones priorizadas de ahorro.' },
      { title: 'Dimensionamiento de proyectos', text: 'Estudio técnico previo a la inversión para asegurar el retorno esperado.' },
    ],
  },
];

export default function ServiceTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className="svc-tabs">
      <div className="svc-tabs__list" role="tablist" aria-label="Tipos de servicio de ingeniería">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`svc-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`svc-panel-${t.id}`}
            className={`svc-tabs__tab ${active === t.id ? 'is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            <span aria-hidden="true">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="svc-tabs__panel" role="tabpanel" id={`svc-panel-${tab.id}`} aria-labelledby={`svc-tab-${tab.id}`} key={tab.id}>
        <p className="svc-tabs__intro">{tab.intro}</p>
        <div className="svc-tabs__items">
          {tab.items.map((i) => (
            <article key={i.title} className="svc-tabs__item">
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </article>
          ))}
        </div>
        <a href="#contacto" className="landing-button landing-button--primary svc-tabs__cta">Cotizar {tab.label.toLowerCase()}</a>
      </div>
    </div>
  );
}
