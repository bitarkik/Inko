import { useState } from 'react';
import type { Order, Store } from '../types';
import { StatusTag } from '../components/StatusTag';
import { money } from '../utils';

export function Orders({ orders, stores }: { orders: Order[], stores: Store[] }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [store, setStore] = useState('all');

  const storeName = (id: string) => stores.find(x => x.id === id)?.name || id;

  const data = orders.filter(o => 
    (status === 'all' || o.status === status) && 
    (store === 'all' || o.store === store) && 
    (!q || [o.id, o.customer, storeName(o.store)].join(' ').toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <section className="page active" id="orders">
      <div className="panel orders-panel">
        <div className="toolbar">
          <label className="searchbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            <input type="search" placeholder="Search order, customer or store" value={q} onChange={e => setQ(e.target.value)} />
          </label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">All statuses</option><option>Printing</option><option>Queued</option><option>Dispatched</option><option>Completed</option><option>Cancelled</option>
          </select>
          <select value={store} onChange={e => setStore(e.target.value)}>
            <option value="all">All stores</option>
            {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order</th><th>Store</th><th>Customer</th><th>Pages</th><th>SLA</th><th>Placed</th><th>Value</th><th>Status</th></tr></thead>
            <tbody>
              {data.map((o, i) => (
                <tr key={i}>
                  <td><b className="mono">#{o.id}</b></td>
                  <td><b>{storeName(o.store)}</b><div className="subtext mono">#{o.store}</div></td>
                  <td>{o.customer}</td>
                  <td className="numeric">{o.pages}</td>
                  <td>{o.sla}</td>
                  <td>Today, {o.placed}</td>
                  <td><b>{money(o.value)}</b></td>
                  <td><StatusTag s={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && <div className="empty">No orders match these filters.</div>}
      </div>
    </section>
  );
}
