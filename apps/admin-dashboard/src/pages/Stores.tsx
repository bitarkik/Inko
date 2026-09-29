import { useState } from 'react';
import type { Store } from '../types';
import { StatusTag } from '../components/StatusTag';
import { StoreCard } from '../components/StoreCard';
import { money } from '../utils';

export function Stores({ stores, openDrawer, offlineCount }: { stores: Store[], openDrawer: (s: Store) => void, offlineCount: number }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [zone, setZone] = useState('all');
  const [sort, setSort] = useState('sales');

  let data = stores.filter(s => 
    (status === 'all' || s.status === status) && 
    (zone === 'all' || s.zone === zone) && 
    (!q || [s.id, s.name, s.owner, s.phone, s.area, s.zone].join(' ').toLowerCase().includes(q.toLowerCase()))
  );

  data.sort((a, b) => sort === 'jobs' ? b.jobs - a.jobs : sort === 'rating' ? b.rating - a.rating : sort === 'recent' ? b.regSort - a.regSort : b.sales - a.sales);

  return (
    <section className="page active" id="stores">
      <div className="status-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>
        <div>
          <b>{offlineCount > 0 ? `${offlineCount} store(s) currently offline.` : 'Network is healthy.'}</b>
          <span>Use status and zone filters to isolate network gaps, or open a store for queue, ledger and purge details.</span>
        </div>
      </div>
      
      <div className="panel">
        <div className="toolbar">
          <label className="searchbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            <input type="search" placeholder="Search store, ID, owner or area" value={q} onChange={e => setQ(e.target.value)} />
          </label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">All statuses</option><option>Live</option><option>Busy</option><option>Offline</option><option>Suspended</option>
          </select>
          <select value={zone} onChange={e => setZone(e.target.value)}>
            <option value="all">All zones</option><option>Zone A</option><option>Zone B</option><option>Zone C</option><option>Zone D</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="sales">Sales: high first</option><option value="jobs">Jobs: high first</option><option value="rating">Rating: high first</option><option value="recent">Newest first</option>
          </select>
        </div>
        
        <div className="table-wrap">
          <table>
            <thead><tr><th>Store ID & name</th><th>Owner / contact</th><th>Location & zone</th><th>Registered</th><th>Active duration</th><th>Status</th><th>Total jobs</th><th>Gross sales</th><th>Platform cut</th><th>Avg TAT</th><th>Rating</th><th>Actions</th></tr></thead>
            <tbody>
              {data.map((s, i) => (
                <tr key={i} onClick={() => openDrawer(s)}>
                  <td className="store-cell"><div className="store-name">{s.name}</div><div className="subtext mono">#{s.id}</div></td>
                  <td><b>{s.owner}</b><div className="subtext" style={{lineHeight: 1.3}}>{s.email}<br/>{s.phone}</div></td>
                  <td><b>{s.area}</b><div className="subtext">{s.zone}</div></td>
                  <td className="numeric">{s.registered}</td>
                  <td><b>{s.days} days</b><div className="subtext">Online {s.online}%</div></td>
                  <td><StatusTag s={s.status} /></td>
                  <td className="numeric"><b>{s.jobs.toLocaleString()}</b><div className="subtext">{s.failed} failed</div></td>
                  <td className="numeric"><b>{money(s.sales)}</b></td>
                  <td className="numeric">{money(s.cut)}</td>
                  <td>{s.tat} min</td>
                  <td><span className="rating">★ {s.rating}</span><div className="subtext">{s.reviews} reviews</div></td>
                  <td><button className="action-dots">•••</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mobile-cards">
          {data.map((s, i) => <StoreCard key={i} s={s} onClick={() => openDrawer(s)} />)}
        </div>
        {data.length === 0 && <div className="empty">No stores match these filters.</div>}
      </div>
    </section>
  );
}
