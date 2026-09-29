import { useState, useEffect, useRef } from 'react';

// Common Types
type Store = {
  id: string; name: string; owner: string; phone: string; email: string;
  area: string; zone: string; registered: string; regSort: number; days: number;
  online: number; status: string; jobs: number; failed: number; sales: number;
  cut: number; tat: number; rating: number; reviews: number; lat: number; lng: number;
  queue: number; hardware: string[]; printers: string[]; settlement: number; lastPingAt: string;
};

type Order = {
  id: string; store: string; customer: string; pages: number; sla: string;
  placed: string; value: number; status: string;
};

type Application = {
  id: string; name: string; owner: string; area: string;
  submitted: string; hardware: string; docs: string;
};

// Utilities
const money = (n: number) => `৳${Math.round(n).toLocaleString('en-US')}`;

const StatusTag = ({ s }: { s: string }) => {
  return <span className={`tag ${s.toLowerCase()}`}>{s}</span>;
};

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
      stores.forEach(s => {
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

function Overview({ stats, offlineStores, stores, openDrawer }: { stats: any, offlineStores: Store[], stores: Store[], openDrawer: (s: Store) => void }) {
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

function Stores({ stores, openDrawer, offlineCount }: { stores: Store[], openDrawer: (s: Store) => void, offlineCount: number }) {
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

function Orders({ orders, stores }: { orders: Order[], stores: Store[] }) {
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

function MapPage({ stores, mapContainer }: { stores: Store[], mapContainer: any }) {
  return (
    <section className="page active" id="mapPage">
      <div className="map-layout">
        <div className="panel">
          <div id="mapCanvas">
            <div id="map" ref={mapContainer} style={{height: '520px', borderRadius: 'var(--radius)', background: 'var(--panel-2)', overflow: 'hidden', zIndex: 1}}></div>
            <div className="map-fallback" style={{display: 'none'}}><b>Map tiles are unavailable.</b></div>
          </div>
        </div>
        <aside className="panel map-side">
          <div className="panel-head" style={{padding: '0 0 12px'}}><div><h3>Network by area</h3><span>Queue load across active partners</span></div></div>
          <div className="legend"><span><i style={{background:'var(--emerald)'}}></i>Ready</span><span><i style={{background:'var(--amber)'}}></i>Busy</span><span><i style={{background:'var(--red)'}}></i>Offline</span><span><i style={{background:'var(--blue)'}}></i>Demand hotspot</span></div>
          <div className="zone-list">
            {stores.map((s, i) => (
              <div key={i} className="zone">
                <i style={{background: s.status === 'Live' ? 'var(--emerald)' : s.status === 'Busy' ? 'var(--amber)' : 'var(--red)'}}></i>
                <div><b>{s.area}</b><small>{s.name}</small></div>
                <span className="load">{s.queue} queued</span>
              </div>
            ))}
          </div>
          <div className="map-note">Pins show approximate area-level positions. Demand circles summarize sample order concentration.</div>
        </aside>
      </div>
    </section>
  );
}

function Approvals({ applications, approveApp }: { applications: Application[], approveApp: (id: string) => void }) {
  return (
    <section className="page active" id="approvals">
      <div className="status-banner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 4 7v5c0 4.8 3.3 7.7 8 9 4.7-1.3 8-4.2 8-9V7l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>
        <div><b>{applications.length} applications need a decision.</b><span>Verify owner identity, trade licence, payout details and hardware before enabling auto-dispatch.</span></div>
      </div>
      <div className="approvals">
        {applications.map((a, i) => (
          <article key={i} className="panel approval-card">
            <div className="approval-top"><div><h3>{a.name}</h3><div className="owner">{a.owner} · {a.id}</div></div><StatusTag s="Pending" /></div>
            <div className="approval-meta">
              <div className="fact"><small>Area</small><b>{a.area}</b></div>
              <div className="fact"><small>Submitted</small><b>{a.submitted}</b></div>
              <div className="fact"><small>Hardware</small><b>{a.hardware}</b></div>
              <div className="fact"><small>Documents</small><b>{a.docs}</b></div>
            </div>
            <div className="approval-actions">
              <button className="secondary-btn">Review file</button>
              <button className="primary-btn" onClick={() => approveApp(a.id)}>Approve store</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StoreCard({ s, onClick }: { s: Store, onClick: () => void }) {
  return (
    <article className="store-card" onClick={onClick}>
      <div className="store-card-top">
        <div><h3>{s.name}</h3><div className="subtext mono">#{s.id} · {s.area} · {s.zone}</div></div>
        <StatusTag s={s.status} />
      </div>
      <div className="facts">
        <div className="fact"><small>Gross sales</small><b>{money(s.sales)}</b></div>
        <div className="fact"><small>Total jobs</small><b>{s.jobs.toLocaleString()} · {s.failed} failed</b></div>
        <div className="fact"><small>Online / turnaround</small><b>{s.online}% · {s.tat} min</b></div>
        <div className="fact"><small>Rating</small><b className="rating">★ {s.rating} ({s.reviews})</b></div>
      </div>
    </article>
  );
}
