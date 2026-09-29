import type { Store } from '../types';
import { StatusTag } from '../components/StatusTag';
import { StoreCard } from '../components/StoreCard';
import { money } from '../utils';

export function Overview({ stats, offlineStores, stores, openDrawer }: { stats: any, offlineStores: Store[], stores: Store[], openDrawer: (s: Store) => void }) {
  const topStores = [...stores].sort((a,b)=>b.sales-a.sales).slice(0,5);

  return (
    <section className="page active" id="overview">
      <div className="kpis">
        <article className="kpi primary">
          <div className="kpi-top"><span>GMV · TOTAL</span><span>৳</span></div>
          <div className="kpi-value">{money(stats.gmv)}</div>
          <div className="kpi-foot"><span>Today {money(0)}</span><span>Live</span></div>
        </article>
        <article className="kpi">
          <div className="kpi-top"><span>PLATFORM TAKE · TOTAL</span><span>10%</span></div>
          <div className="kpi-value">{money(stats.take)}</div>
          <div className="kpi-foot"><span className="delta">Today {money(0)}</span><span>Live</span></div>
        </article>
        <article className="kpi">
          <div className="kpi-top"><span>PRINT JOBS · TOTAL</span><span>Live</span></div>
          <div className="kpi-value">{stats.jobs} done</div>
          <div className="mini-bar"><span style={{width:'84.7%',background:'var(--emerald)'}}></span><span style={{width:'10.1%',background:'var(--amber)'}}></span><span style={{width:'3.1%',background:'var(--blue)'}}></span><span style={{width:'2.1%',background:'var(--red)'}}></span></div>
          <div className="kpi-foot"><span>{stats.pagesColor} color · {stats.pagesBw} b&w</span></div>
        </article>
        <article className="kpi">
          <div className="kpi-top"><span>STORE HEALTH</span><span>{stats.totalStores} total</span></div>
          <div className="kpi-value">{stats.liveStores} ready</div>
          <div className="kpi-foot"><span className="delta" style={{color:'var(--amber)'}}>0 busy</span><span>{stats.offlineStores} offline</span></div>
        </article>
        <article className="kpi">
          <div className="kpi-top"><span>ACTIVE CUSTOMERS</span><span>30D</span></div>
          <div className="kpi-value">Live</div>
          <div className="kpi-foot"><span className="delta">+0%</span><span>Growing</span></div>
        </article>
      </div>

      <div className="section-head">
        <div><h2>Operating picture</h2><p>Revenue momentum and issues requiring intervention</p></div>
        <button className="link-btn">Review all stores →</button>
      </div>
      
      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-head"><div><h3>Gross merchandise value</h3><span>Last 14 days · BDT</span></div><StatusTag s="Live" /></div>
          <div className="trend-chart">
            <div className="trend-summary"><div><b>{money(stats.gmv)}</b><span>GMV</span></div><div><b>{money(stats.take)}</b><span>platform cut</span></div></div>
            <div className="chart-wrap">
              <svg viewBox="0 0 700 165" preserveAspectRatio="none" role="img"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b8f59" stopOpacity=".28"/><stop offset="1" stopColor="#0b8f59" stopOpacity="0"/></linearGradient></defs><path d="M0,137 L54,126 L108,131 L162,100 L215,112 L269,84 L323,92 L377,68 L431,78 L485,46 L538,59 L592,31 L646,43 L700,18 L700,165 L0,165 Z" fill="url(#area)"/><path d="M0,137 L54,126 L108,131 L162,100 L215,112 L269,84 L323,92 L377,68 L431,78 L485,46 L538,59 L592,31 L646,43 L700,18" fill="none" stroke="var(--emerald)" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg>
            </div>
            <div className="chart-labels"><span>-14d</span><span>-10d</span><span>-7d</span><span>-3d</span><span>Today</span></div>
          </div>
        </article>
        
        <article className="panel">
          <div className="panel-head">
            <div><h3>Needs attention</h3><span>Prioritized operational exceptions</span></div>
            <span className={`tag ${offlineStores.length ? 'offline' : 'live'}`}>{offlineStores.length || '0'} items</span>
          </div>
          <div className="attention-list">
            {offlineStores.length > 0 ? offlineStores.map((s, i) => (
              <div key={i} className="attention-item">
                <span className="signal" style={{background:'var(--red)'}}></span>
                <div><b>{s.name} offline</b><small>Agent heartbeat missed</small></div>
                <button className="link-btn" onClick={() => openDrawer(s)}>Open</button>
              </div>
            )) : (
              <div className="attention-item"><div><b>All systems normal</b><small>No offline agents</small></div></div>
            )}
          </div>
        </article>
      </div>

      <div className="section-head"><div><h2>Top partner stores</h2><p>Month-to-date performance by gross sales</p></div></div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Store</th><th>Status</th><th>Jobs</th><th>Gross sales</th><th>Platform cut</th><th>Avg turn.</th><th>Rating</th><th></th></tr></thead>
            <tbody>
              {topStores.map((s, i) => (
                <tr key={i} onClick={() => openDrawer(s)}>
                  <td className="store-cell"><div className="store-name">{s.name}</div><div className="subtext mono">#{s.id}</div></td>
                  <td><StatusTag s={s.status} /></td>
                  <td className="numeric"><b>{s.jobs.toLocaleString()}</b><div className="subtext">{s.failed} failed</div></td>
                  <td className="numeric"><b>{money(s.sales)}</b></td>
                  <td className="numeric">{money(s.cut)}</td>
                  <td>{s.tat} min</td>
                  <td><span className="rating">★ {s.rating}</span></td>
                  <td><button className="action-dots">›</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-cards">
          {topStores.map((s, i) => <StoreCard key={i} s={s} onClick={() => openDrawer(s)} />)}
        </div>
      </div>
    </section>
  );
}
