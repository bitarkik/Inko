import { useState, useEffect, useRef } from 'react';
import type { Store, Order, Application } from './types';
import { money } from './utils';
import { StatusTag } from './components/StatusTag';
import { Overview } from './pages/Overview';
import { Stores } from './pages/Stores';
import { Orders } from './pages/Orders';
import { MapPage } from './pages/MapPage';
import { Approvals } from './pages/Approvals';

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [stores, setStores] = useState<Store[]>([]);
  const [orders] = useState<Order[]>([
    { id: 'PP-98342', store: 'P-118', customer: 'Nadia S.', pages: 186, sla: '31 min', placed: '16:38', value: 620, status: 'Printing' },
    { id: 'PP-98341', store: 'P-104', customer: 'Imran K.', pages: 42, sla: '12 min', placed: '16:34', value: 210, status: 'Printing' }
  ]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState({ gmv: 0, take: 0, jobs: 0, pagesColor: 0, pagesBw: 0, totalStores: 0, liveStores: 0, offlineStores: 0 });
  const [offlineStoreList, setOfflineStoreList] = useState<Store[]>([]);
  
  const [toastMsg, setToastMsg] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [drawerTab, setDrawerTab] = useState('profile');
  
  const mapRef = useRef<any>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const fetchLiveData = async () => {
    try {
      const res = await fetch('https://printpanda-api.onrender.com/admin/stats');
      const data = await res.json();
      
      const pStats = data.platformStats;
      setStats({
        gmv: pStats.totalRevenue,
        take: pStats.totalRevenue * 0.1,
        jobs: pStats.totalCompletedJobs,
        pagesColor: pStats.totalColorPages,
        pagesBw: pStats.totalBwPages,
        totalStores: data.allStores.length,
        liveStores: data.allStores.filter((s: any) => s.isActive).length,
        offlineStores: data.allStores.filter((s: any) => !s.isActive).length,
      });

      const activeStores = data.allStores.filter((s: any) => s.status !== 'PENDING');
      const pendingStores = data.allStores.filter((s: any) => s.status === 'PENDING');
      
      setApplications(pendingStores.map((a: any) => ({
        id: a.id,
        name: a.name,
        owner: a.ownerName || 'N/A',
        area: a.address,
        submitted: new Date(a.createdAt).toLocaleDateString(),
        hardware: 'Printers',
        docs: 'Pending'
      })));

      const parsedStores = activeStores.map((s: any, i: number) => ({
        id: s.id,
        name: s.name,
        owner: s.ownerName || 'N/A',
        phone: s.contactNumber || 'N/A',
        email: s.email || 'N/A',
        area: s.address,
        zone: 'Zone A',
        registered: new Date(s.createdAt).toLocaleDateString(),
        regSort: new Date(s.createdAt).getTime(),
        days: Math.floor((new Date().getTime() - new Date(s.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
        online: 100,
        status: s.isActive ? 'Live' : 'Offline',
        jobs: s.completedJobs,
        failed: 0,
        sales: s.revenue,
        cut: s.revenue * 0.1,
        tat: 15,
        rating: 5.0,
        reviews: 0,
        lat: 23.75 + (i * 0.01),
        lng: 90.38 + (i * 0.01),
        queue: 0,
        hardware: ['A4 & A3'],
        printers: [],
        settlement: 0,
        lastPingAt: s.lastPingAt
      }));
      setStores(parsedStores);
      setOfflineStoreList(parsedStores.filter((s: Store) => s.status === 'Offline'));

    } catch (err) {
      console.error("Failed to fetch live stats", err);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, []);

  const initMap = () => {
    if (mapRef.current) {
      try { mapRef.current.invalidateSize(); } catch (e) {}
      return;
    }
    const L = (window as any).L;
    if (!L || !mapContainer.current) return;
    
    try {
      const map = L.map(mapContainer.current, { scrollWheelZoom: false }).setView([23.7808, 90.4004], 11.7);
      mapRef.current = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      stores.forEach((s: Store) => {
        const c = s.status === 'Live' ? '#0b8f59' : s.status === 'Busy' ? '#c57b09' : '#c63a3a';
        const marker = L.circleMarker([s.lat, s.lng], { radius: 8, fillColor: c, color: '#fff', weight: 3, fillOpacity: 1 }).addTo(map);
        marker.bindPopup(`<b>${s.name}</b><br>${s.area} · ${s.status}<br>${s.queue} jobs queued`);
      });
      [
        { name: 'DU / Nilkhet demand', lat: 23.7332, lng: 90.3915, r: 900 },
        { name: 'Motijheel demand', lat: 23.728, lng: 90.418, r: 750 },
        { name: 'Gulshan demand', lat: 23.781, lng: 90.414, r: 680 },
        { name: 'Uttara demand', lat: 23.868, lng: 90.400, r: 800 }
      ].forEach(h => L.circle([h.lat, h.lng], { radius: h.r, color: '#2873c7', weight: 1, fillColor: '#4f9ce8', fillOpacity: 0.13, dashArray: '5 5' }).addTo(map).bindTooltip(h.name));
      setTimeout(() => map.invalidateSize(), 120);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activePage === 'mapPage') {
      initMap();
    }
  }, [activePage, stores]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2400);
  };

  const approveApp = async (id: string) => {
    if (!window.confirm("Are you sure you want to approve this store?")) return;
    try {
      const res = await fetch(`https://printpanda-api.onrender.com/admin/stores/${id}/approve`, { method: 'PATCH' });
      if (res.ok) {
        showToast('Store approved!');
        fetchLiveData();
      } else {
        showToast('Failed to approve store.');
      }
    } catch (e) {
      showToast('Network error.');
    }
  };

  const openDrawer = (store: Store, tab: string = 'profile') => {
    setCurrentStore(store);
    setDrawerTab(tab);
    setDrawerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    document.body.style.overflow = '';
  };
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview stats={stats} offlineStores={offlineStoreList} stores={stores} openDrawer={openDrawer} />;
      case 'stores':
        return <Stores stores={stores} openDrawer={openDrawer} offlineCount={offlineStoreList.length} />;
      case 'orders':
        return <Orders orders={orders} stores={stores} />;
      case 'mapPage':
        return <MapPage stores={stores} mapContainer={mapContainer} />;
      case 'approvals':
        return <Approvals applications={applications} approveApp={approveApp} />;
      default: return null;
    }
  };

  const titles: Record<string, string[]> = {
    overview: ['Network overview', 'Marketplace pulse, exceptions and partner performance'],
    stores: ['Store directory', 'Audit every partner, service level and settlement contribution'],
    orders: ['Global orders', 'All print jobs across the network, in one operational queue'],
    mapPage: ['Dhaka operations map', 'Store readiness and sample demand concentration by area'],
    approvals: ['Partner approvals', 'Review applications before stores enter the dispatch network']
  };

  return (
    <div className="app">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-note"><strong>Operations</strong><span>Dhaka network</span></div>
        <nav className="nav">
          <button className={`nav-btn ${activePage === 'overview' ? 'active' : ''}`} onClick={() => setActivePage('overview')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-13h6V4h-6v3Z"/></svg><span>Overview</span>
          </button>
          <button className={`nav-btn ${activePage === 'stores' ? 'active' : ''}`} onClick={() => setActivePage('stores')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 9h16l-1-5H5L4 9Zm1 0v11h14V9M9 20v-6h6v6"/><path d="M4 9c0 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0 1 2 4 2 4 0"/></svg><span>Stores</span>
          </button>
          <button className={`nav-btn ${activePage === 'orders' ? 'active' : ''}`} onClick={() => setActivePage('orders')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg><span>Orders</span>
          </button>
          <button className={`nav-btn ${activePage === 'mapPage' ? 'active' : ''}`} onClick={() => setActivePage('mapPage')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></svg><span>Map</span>
          </button>
          <button className={`nav-btn ${activePage === 'approvals' ? 'active' : ''}`} onClick={() => setActivePage('approvals')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11 11 13 15 9"/><path d="M5 4h14v16H5z"/><path d="M9 4V2h6v2"/></svg><span>Approvals</span><span className="count">{applications.length}</span>
          </button>
        </nav>
        <div className="sidebar-foot"><b>Live operations view</b><br/>Data from PrintPanda API</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="headline">
            <h1>{titles[activePage][0]}</h1>
            <p>{titles[activePage][1]}</p>
          </div>
          <div className="top-actions">
            <div className="data-stamp"><span className="live-dot"></span> Live data · {new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
            <button className="icon-btn" onClick={() => showToast('Use the sidebar to switch views; click any store for its operating profile.')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 3.2 2.3c-.6.25-.9.7-.9 1.2v.5M12 17h.01"/></svg>
            </button>
          </div>
        </header>

        {renderPage()}
      </main>

      <div className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer}></div>
      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        {currentStore && (
          <>
            <div className="drawer-head">
              <div>
                <h2>{currentStore.name}</h2>
                <p><span className="mono">#{currentStore.id}</span> · {currentStore.area} · {currentStore.zone} · {currentStore.status}</p>
              </div>
              <button className="icon-btn" onClick={closeDrawer}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>
              </button>
            </div>
            <div className="drawer-body">
              <div className="drawer-tabs">
                <button className={`drawer-tab ${drawerTab === 'profile' ? 'active' : ''}`} onClick={() => setDrawerTab('profile')}>Profile</button>
                <button className={`drawer-tab ${drawerTab === 'queue' ? 'active' : ''}`} onClick={() => setDrawerTab('queue')}>Live queue</button>
                <button className={`drawer-tab ${drawerTab === 'ledger' ? 'active' : ''}`} onClick={() => setDrawerTab('ledger')}>Ledger</button>
                <button className={`drawer-tab ${drawerTab === 'purge' ? 'active' : ''}`} onClick={() => setDrawerTab('purge')}>Purge log</button>
              </div>
              
              <div className={`drawer-view ${drawerTab === 'profile' ? 'active' : ''}`}>
                <div className="detail-kpis">
                  <div className="detail-kpi"><small>GROSS SALES</small><b>{money(currentStore.sales)}</b></div>
                  <div className="detail-kpi"><small>PLATFORM CUT</small><b>{money(currentStore.cut)}</b></div>
                  <div className="detail-kpi"><small>AVG TURNAROUND</small><b>{currentStore.tat} min</b></div>
                </div>
                <div className="detail-section">
                  <h3>Owner & reliability</h3>
                  <div className="approval-meta" style={{margin:0, borderBottom:0}}>
                    <div className="fact"><small>Owner / hotline</small><b>{currentStore.owner}</b><div className="subtext">{currentStore.email}<br/>{currentStore.phone}</div></div>
                    <div className="fact"><small>Registered</small><b>{currentStore.registered}</b></div>
                    <div className="fact"><small>Active duration</small><b>{currentStore.days} days · {currentStore.online}% online</b></div>
                    <div className="fact"><small>Customer quality</small><b className="rating">★ {currentStore.rating} · {currentStore.reviews} reviews</b></div>
                  </div>
                </div>
                <div className="detail-section">
                  <h3>Hardware & capabilities</h3>
                  <div className="capabilities">{currentStore.hardware.map((x, i) => <span key={i} className="cap">{x}</span>)}</div>
                  <div style={{marginTop: '12px'}}>
                    {currentStore.printers.map((p, i) => (
                      <div key={i} className="queue-item">
                        <div><b>{p.split(' · ')[0]}</b><small>{p.split(' · ')[1]}</small></div>
                        <span className="signal" style={{width: '8px', height: '8px', borderRadius: '50%', background: p.includes('Offline') ? 'var(--red)' : p.includes('Printing') ? 'var(--amber)' : 'var(--emerald)'}}></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`drawer-view ${drawerTab === 'queue' ? 'active' : ''}`}>
                <div className="detail-kpis">
                  <div className="detail-kpi"><small>QUEUE DEPTH</small><b>{currentStore.queue}</b></div>
                  <div className="detail-kpi"><small>AVG SLA</small><b>{currentStore.tat} min</b></div>
                  <div className="detail-kpi"><small>AGENT STATUS</small><b style={{color: currentStore.status === 'Offline' ? 'var(--red)' : 'var(--emerald-deep)'}}>{currentStore.status === 'Offline' ? 'Offline' : 'Connected'}</b></div>
                </div>
                <div className="detail-section">
                  <h3>Active print jobs</h3>
                  {orders.filter(o => o.store === currentStore.id && ['Printing','Queued'].includes(o.status)).length > 0 ? 
                    orders.filter(o => o.store === currentStore.id && ['Printing','Queued'].includes(o.status)).map((o, i) => (
                      <div key={i} className="queue-item">
                        <div><b>#{o.id} · {o.pages} pages</b><small>{o.customer} · {o.status}</small>
                          <div className="queue-progress"><i style={{width: o.status === 'Printing' ? (42 + i * 21) + '%' : '8%'}}></i></div>
                        </div>
                        <b>{o.sla}</b>
                      </div>
                    )) : <p style={{color: 'var(--muted)', fontSize: '12px'}}>No active jobs in the sample queue.</p>
                  }
                </div>
              </div>

              <div className={`drawer-view ${drawerTab === 'ledger' ? 'active' : ''}`}>
                <div className="detail-kpis">
                  <div className="detail-kpi"><small>UNSETTLED</small><b>{money(currentStore.settlement)}</b></div>
                  <div className="detail-kpi"><small>PLATFORM CUT</small><b>{money(currentStore.cut)}</b></div>
                  <div className="detail-kpi"><small>NEXT BATCH</small><b>28 Sep</b></div>
                </div>
                <div className="detail-section">
                  <h3>Settlement ledger</h3>
                  <div className="ledger-item"><div><b>Batch ST-0926-18</b><small>bKash merchant payout · 26 Sep</small></div><b style={{color: 'var(--emerald-deep)'}}>+{money(Math.round(currentStore.sales*.18))}</b></div>
                  <div className="ledger-item"><div><b>Commission reconciliation</b><small>Platform take · 26 Sep</small></div><b>-{money(Math.round(currentStore.cut*.18))}</b></div>
                  <div className="ledger-item"><div><b>Batch ST-0924-11</b><small>Bank transfer · 24 Sep</small></div><b style={{color: 'var(--emerald-deep)'}}>+{money(Math.round(currentStore.sales*.14))}</b></div>
                </div>
              </div>

              <div className={`drawer-view ${drawerTab === 'purge' ? 'active' : ''}`}>
                <div className="detail-kpis">
                  <div className="detail-kpi"><small>FILES PURGED</small><b>100%</b></div>
                  <div className="detail-kpi"><small>LAST RUN</small><b>16:39</b></div>
                  <div className="detail-kpi"><small>EXCEPTIONS</small><b>0</b></div>
                </div>
                <div className="detail-section">
                  <h3>Recent document purge events</h3>
                  {['PP-98342','PP-98318','PP-98291','PP-98277'].map((id, i) => (
                    <div key={i} className="purge-item">
                      <div><b>#{id} · encrypted job cache</b><small>Purged {i === 0 ? 'today, 16:39' : 'today, '+(15-i)+':'+(42-i*7)} · retention 0 min</small></div>
                      <StatusTag s="Completed" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </aside>

      <div className={`toast ${toastMsg ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}
