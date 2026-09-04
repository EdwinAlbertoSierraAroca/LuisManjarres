const cards = [
  { label: 'Clientes', value: '2,480', trend: '+12.4%', tone: 'success', icon: '◎' },
  { label: 'Proyectos', value: '186', trend: '+8.1%', tone: 'primary', icon: '▣' },
  { label: 'Cotizaciones', value: '94', trend: '+14.8%', tone: 'warning', icon: '✦' },
  { label: 'Leads', value: '342', trend: '+9.6%', tone: 'danger', icon: '◌' },
];

const recentActivity = [
  { title: 'Nueva cotización', subtitle: 'Residencial Solar Norte · 18 min', status: 'Pendiente', tone: 'warning' },
  { title: 'Lead calificado', subtitle: 'Carlos M. · 2h', status: 'Nuevo', tone: 'success' },
  { title: 'Proyecto actualizado', subtitle: 'Campus Verde · 5h', status: 'Activo', tone: 'primary' },
];

export default function DashboardPage() {
  return (
    <>
      <section className="stats-grid">
        {cards.map((card) => (
          <article key={card.label} className="pro-card metric-card">
            <div className="card-topline">
              <span className={`metric-icon ${card.tone}`}>{card.icon}</span>
              <span className="metric-label">{card.label}</span>
            </div>
            <div className="metric-value">{card.value}</div>
            <div className={`metric-trend ${card.tone}`}>{card.trend}</div>
          </article>
        ))}
      </section>

      <section className="overview-grid">
        <div className="pro-card chart-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Producción</p>
              <h2>Energía generada</h2>
            </div>
            <span className="status-pill success">+18.2%</span>
          </div>

          <div className="bars-chart">
            {[34, 42, 38, 54, 58, 68, 64, 82, 91, 88, 97, 108].map((height, index) => (
              <div key={index} className="bar-column">
                <span className="bar" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="pro-card compact-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Objetivos</p>
              <h2>Meta del mes</h2>
            </div>
          </div>

          <div className="progress-stack">
            {[
              { label: 'Ahorro anual', value: '72%', percent: 72 },
              { label: 'Instalaciones', value: '58%', percent: 58 },
              { label: 'Leads', value: '81%', percent: 81 },
            ].map((item) => (
              <div key={item.label} className="progress-item">
                <div className="progress-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="pro-card list-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Actividad</p>
              <h2>Últimos movimientos</h2>
            </div>
          </div>

          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={item.title} className="activity-item">
                <div>
                  <div className="activity-title">{item.title}</div>
                  <div className="activity-subtitle">{item.subtitle}</div>
                </div>
                <span className={`status-pill ${item.tone}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pro-card summary-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Resumen</p>
              <h2>Rendimiento</h2>
            </div>
          </div>

          <div className="summary-list">
            <div className="summary-box">
              <span>Ahorro generado</span>
              <strong>$1.28M</strong>
            </div>
            <div className="summary-box">
              <span>Potencia instalada</span>
              <strong>8.6 MW</strong>
            </div>
            <div className="summary-box">
              <span>Energía generada</span>
              <strong>15.2 GWh</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
