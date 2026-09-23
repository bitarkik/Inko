import { useState, useEffect, useRef } from 'react'
import './index.css'

type Language = 'en' | 'bn';

const i18n = {
  en: {
    brand: "PrintPanda",
    ordersQueue: "Orders Queue",
    completed: "Completed",
    activity: "Activity",
    settings: "Settings",
    listening: "Listening for orders",
    paused: "Order listener paused",
    clickToPause: "Click to pause",
    clickToResume: "Click to resume",
    todaysJobs: "Today's Jobs",
    pagesPrinted: "Pages Printed",
    todaysRevenue: "Today's Revenue",
    queueSubtitle: "Incoming jobs, ready when you are.",
    completedSubtitle: "Finished jobs ready for customer pickup.",
    activitySubtitle: "A clear record of orders, printing and connection events.",
    settingsSubtitle: "Manage this shop, printer behaviour and setup.",
    printerConnected: "Printer Connected",
    printerOffline: "Printer Offline",
    simulateOrder: "Simulate new order",
    liveQueue: "Live queue · Newest first",
    select: "select",
    print: "print",
    pages: "pages",
    ready: "Ready",
    printing: "Printing",
    new: "New",
    pdfDocument: "PDF document",
    printSpecs: "Print specifications",
    paperSize: "Paper size",
    printColor: "Print color",
    sides: "Sides",
    quantity: "Quantity",
    orderTotal: "Order total",
    printJob: "Print",
    completedText: "Completed",
    storeConnection: "Store connection",
    autoPrint: "Auto-print",
    autoPrintDesc: "Print new orders automatically as they arrive, with a cover page showing the order number.",
    firstRun: "First-run experience",
    previewSetup: "Preview first-run setup",
    connectShop: "Connect your shop",
    storeIdText: "Store ID",
    cancel: "Cancel",
    continueOrders: "Continue to orders",
    shopConnected: "Shop connected",
    queueClear: "Queue is clear",
    queueClearDesc: "New online orders will appear here as they arrive.",
    language: "Language",
    toggleLanguage: "Switch to Bangla",
    refresh: "Refresh Queue",
  },
  bn: {
    brand: "প্রিন্টপান্ডা",
    ordersQueue: "অর্ডার কিউ",
    completed: "সম্পন্ন",
    activity: "অ্যাক্টিভিটি",
    settings: "সেটিংস",
    listening: "অর্ডারের জন্য অপেক্ষা করছি",
    paused: "অর্ডার শোনা বন্ধ আছে",
    clickToPause: "থামাতে ক্লিক করুন",
    clickToResume: "চালু করতে ক্লিক করুন",
    todaysJobs: "আজকের জবস",
    pagesPrinted: "পৃষ্ঠা প্রিন্ট হয়েছে",
    todaysRevenue: "আজকের আয়",
    queueSubtitle: "নতুন কাজ, আপনি প্রস্তুত হলেই শুরু হবে।",
    completedSubtitle: "শেষ হওয়া কাজ, গ্রাহকের জন্য প্রস্তুত।",
    activitySubtitle: "অর্ডার, প্রিন্টিং এবং কানেকশন ইভেন্টের রেকর্ড।",
    settingsSubtitle: "দোকান, প্রিন্টার এবং সেটআপ পরিচালনা করুন।",
    printerConnected: "প্রিন্টার সংযুক্ত",
    printerOffline: "প্রিন্টার অফলাইন",
    simulateOrder: "নতুন অর্ডার সিমুলেট করুন",
    liveQueue: "লাইভ কিউ · নতুন আগে",
    select: "নির্বাচন করুন",
    print: "প্রিন্ট",
    pages: "পৃষ্ঠা",
    ready: "প্রস্তুত",
    printing: "প্রিন্ট হচ্ছে",
    new: "নতুন",
    pdfDocument: "পিডিএফ ডকুমেন্ট",
    printSpecs: "প্রিন্ট স্পেসিফিকেশন",
    paperSize: "কাগজের আকার",
    printColor: "প্রিন্টের রঙ",
    sides: "পাশ",
    quantity: "পরিমাণ",
    orderTotal: "সর্বমোট",
    printJob: "প্রিন্ট করুন",
    completedText: "সম্পন্ন হয়েছে",
    storeConnection: "স্টোর কানেকশন",
    autoPrint: "অটো-প্রিন্ট",
    autoPrintDesc: "অর্ডার আসার সাথে সাথে স্বয়ংক্রিয়ভাবে প্রিন্ট করুন কভার পেজ সহ।",
    firstRun: "প্রথম সেটআপ",
    previewSetup: "সেটআপ প্রিভিউ দেখুন",
    connectShop: "আপনার দোকান যুক্ত করুন",
    storeIdText: "স্টোর আইডি",
    cancel: "বাতিল",
    continueOrders: "অর্ডারে ফিরে যান",
    shopConnected: "দোকান যুক্ত হয়েছে",
    queueClear: "কোনো অর্ডার নেই",
    queueClearDesc: "অনলাইন থেকে নতুন অর্ডার আসলে এখানে দেখাবে।",
    language: "ভাষা",
    toggleLanguage: "Switch to English",
    refresh: "রিফ্রেশ করুন",
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = i18n[lang];

  const [currentView, setCurrentView] = useState('queue');
  const [storeId, setStoreId] = useState('');
  const [savedStoreId, setSavedStoreId] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState(false);
  
  const [orders, setOrders] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [selected, setSelected] = useState(0);
  
  const [metrics, setMetrics] = useState({ jobs: 0, pages: 0, revenue: 0 });
  const [printer, setPrinter] = useState({ connected: false, name: 'Checking...', status: 'Unknown' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [toast, setToast] = useState({ show: false, text: '' });
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [updateState, setUpdateState] = useState<{ status: 'none' | 'downloading' | 'ready', progress: number, version: string, force: boolean }>({ status: 'none', progress: 0, version: '', force: false });
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);

  const audioCtxRef = useRef<any>(null);

  const fetchHistory = async () => {
    const hist = await window.ipcRenderer.invoke('get-history', 7);
    const mappedHist = hist.map((o: any) => ({
      id: o.id,
      name: o.customerName || `Customer #${o.id.substring(0,4)}`,
      pages: o.totalPages || 0,
      done: new Date(o.updatedAt || o.createdAt).toLocaleDateString() + ' ' + new Date(o.updatedAt || o.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      price: o.totalPrice || 0
    }));
    setCompleted(mappedHist);
    
    const todayStr = new Date().toDateString();
    const todaysOrders = hist.filter((o: any) => new Date(o.updatedAt || o.createdAt).toDateString() === todayStr);
    
    setMetrics({
      jobs: todaysOrders.length,
      pages: todaysOrders.reduce((sum: number, o: any) => sum + (o.totalPages || 0), 0),
      revenue: todaysOrders.reduce((sum: number, o: any) => sum + (Number(o.totalPrice) || 0), 0)
    });
  };

  const seenOrdersRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Initial fetch of IPC states
    window.ipcRenderer.invoke('get-config').then((config: any) => {
      setSavedStoreId(config.storeId || '');
      setStoreId(config.storeId || '');
      setIsAutoPrintEnabled(config.isAutoPrintEnabled || false);
      
      // Auto-open modal if store is not connected
      if (!config.storeId) {
        setIsModalOpen(true);
        setSetupStep(1);
      } else {
        fetchHistory();
        window.ipcRenderer.invoke('get-store-info').then((info: any) => {
          if (info && info.isAcceptingOrders !== undefined) {
            setIsAcceptingOrders(info.isAcceptingOrders);
          }
        });
      }
    });
    
    checkPrinterStatus();
    const interval = setInterval(checkPrinterStatus, 10000); // Check printer every 10s

    const handleAgentLog = (_e: any, msg: string) => addLog('info', msg);
    const handleOrdersUpdated = (_e: any, updatedOrders: any[]) => {
      let hasNew = false;
      updatedOrders.forEach(o => {
        if (!seenOrdersRef.current.has(o.id)) {
          hasNew = true;
          seenOrdersRef.current.add(o.id);
        }
      });

      const mapped = updatedOrders.map((o: any, idx: number) => ({
        ...o,
        name: o.customerName || `Customer #${o.id.substring(0,4)}`,
        paper: o.paperSize || 'A4',
        color: o.colorMode || (idx % 2 === 0 ? 'Color' : 'B&W'),
        side: o.sides || 'Single side',
        copies: o.copies || 1,
        ago: 'Just now',
        status: o.status === 'PRINTING' ? 'printing' : 'new',
        fresh: true
      }));
      
      if (hasNew) playChime();
      setOrders(mapped);
    };
    
    const handleOrderCompleted = (_e: any, o: any) => {
      setCompleted(prev => [{
        id: o.id,
        name: o.name || `Customer #${o.id.substring(0,4)}`,
        pages: o.totalPages || 0,
        done: new Date().toLocaleTimeString(),
        price: o.totalPrice || 0
      }, ...prev]);
      setMetrics(prev => ({
        jobs: prev.jobs + 1,
        pages: prev.pages + (o.totalPages || 0),
        revenue: prev.revenue + (o.totalPrice || 0)
      }));
      showToast(`Order #${o.id.substring(0,6)} printed!`);
    };

    const handleUpdateAvailable = (_e: any, info: any) => setUpdateState(p => ({ ...p, status: 'downloading', version: info.version }));
    const handleUpdateProgress = (_e: any, percent: number) => setUpdateState(p => ({ ...p, progress: percent }));
    const handleUpdateDownloaded = (_e: any, data: any) => setUpdateState({ status: 'ready', progress: 100, version: data.version, force: data.force });

    window.ipcRenderer.on('agent-log', handleAgentLog);
    window.ipcRenderer.on('orders-updated', handleOrdersUpdated);
    window.ipcRenderer.on('order-completed', handleOrderCompleted);
    window.ipcRenderer.on('update-available', handleUpdateAvailable);
    window.ipcRenderer.on('update-progress', handleUpdateProgress);
    window.ipcRenderer.on('update-downloaded', handleUpdateDownloaded);

    return () => {
      clearInterval(interval);
      window.ipcRenderer.off('agent-log', handleAgentLog);
      window.ipcRenderer.off('orders-updated', handleOrdersUpdated);
      window.ipcRenderer.off('order-completed', handleOrderCompleted);
      window.ipcRenderer.off('update-available', handleUpdateAvailable);
      window.ipcRenderer.off('update-progress', handleUpdateProgress);
      window.ipcRenderer.off('update-downloaded', handleUpdateDownloaded);
    };
  }, []); // Run once on mount

  const checkPrinterStatus = async () => {
    try {
      const status = await window.ipcRenderer.invoke('get-printer-status');
      setPrinter(status);
    } catch (e) {
      setPrinter({ connected: false, name: 'Error', status: 'Offline' });
    }
  };

  const addLog = (level: string, message: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{ time, level, message }, ...prev].slice(0, 100));
  };

  const showToast = (text: string) => {
    setToast({ show: true, text });
    setTimeout(() => setToast({ show: false, text: '' }), 3000);
  };

  const playChime = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const c = audioCtxRef.current;
      const g = c.createGain(), o1 = c.createOscillator(), o2 = c.createOscillator();
      o1.frequency.value = 659.25; o2.frequency.value = 880;
      o1.type = 'sine'; o2.type = 'sine';
      g.gain.setValueAtTime(.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(.055, c.currentTime + .02);
      g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + .42);
      o1.connect(g); o2.connect(g); g.connect(c.destination);
      o1.start(); o2.start(c.currentTime + .08);
      o1.stop(c.currentTime + .34); o2.stop(c.currentTime + .43);
    } catch (e) { }
  };

  const togglePolling = async () => {
    if (isPolling) {
      await window.ipcRenderer.invoke('stop-polling');
      setIsPolling(false);
      addLog('warn', t.paused);
      showToast(t.paused);
    } else {
      const res = await window.ipcRenderer.invoke('start-polling');
      if (res.success) {
        setIsPolling(true);
        addLog('info', t.listening);
        showToast(t.listening);
      } else {
        showToast(res.error || 'Error');
      }
    }
  };

  const printSelected = async () => {
    if (!orders[selected] || orders[selected].status === 'printing') return;
    const o = orders[selected];
    
    // Optimistic UI update
    const newOrders = [...orders];
    newOrders[selected].status = 'printing';
    setOrders(newOrders);
    
    await window.ipcRenderer.invoke('print-order', o);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen || currentView !== 'queue') return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(s => Math.min(orders.length - 1, s + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(s => Math.max(0, s - 1));
      } else if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'BUTTON' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        printSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [orders, selected, isModalOpen, currentView]);

  const simulateOrder = () => {
    const n = Math.floor(Math.random() * 1000) + 2000;
    const o = {
      id: `PP-${n}`, name: 'Simulated User', totalPages: 4, totalPrice: 80, paperSize: 'A4', colorMode: 'Color', sides: 'Single', status: 'NEW'
    };
    const mapped = {
      ...o,
      name: o.name,
      paper: o.paperSize,
      color: o.colorMode,
      side: o.sides,
      copies: 1,
      ago: 'Just now',
      status: 'new',
      fresh: true
    };
    setOrders(prev => [mapped, ...prev]);
    setSelected(0);
    playChime();
  };

  const connectShop = async () => {
    if (!storeId) return showToast('Enter Store ID');
    
    const isValid = await window.ipcRenderer.invoke('validate-store', storeId);
    if (!isValid) {
      return showToast('Invalid Store ID. Store not found.');
    }

    await window.ipcRenderer.invoke('set-store-id', storeId);
    setSavedStoreId(storeId);
    setSetupStep(2);
    fetchHistory();
  };

  const formatMoney = (amount: number) => {
    return lang === 'bn' ? `৳${amount.toLocaleString('bn-BD')}` : `৳${amount.toLocaleString('en-US')}`;
  };

  const currentOrder = orders[selected];

  const DetailPane = ({ order }: { order: any }) => {
    if (!order) return null;
    return (
      <article className="detail-card">
        <div className="detail-head">
          <div>
            <div className="detail-title">Order #{order.id.split('-')[0]}...</div>
            <div className="detail-meta">{order.name} · {t.pdfDocument}</div>
          </div>
          {order.status === 'printing' ? <span className="status printing"><span className="mini-spinner"></span>{t.printing}</span> : <span className="status new">{t.new}</span>}
        </div>
        <div className="detail-body">
          <div className="preview-stage">
            <div className="doc">
              <div className="doc-rule"></div>
              <div className="doc-line w92"></div>
              <div className="doc-line w85"></div>
              <div className="doc-line w72"></div>
              <div className="doc-image">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7"><path d="M4 19 9 10l4 6 2-3 5 6Z" stroke="currentColor"/><circle cx="16" cy="7" r="2" stroke="currentColor"/></svg>
              </div>
              <div className="doc-line w92"></div>
              <div className="doc-line w64"></div>
            </div>
            <span className="page-badge">1 / {order.totalPages || order.pages}</span>
          </div>
          <div className="specs">
            <h2>{t.printSpecs}</h2>
            <div className="spec-row">
              <div className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/></svg></div>
              <div><div className="spec-label">{t.paperSize}</div><div className="spec-value">{order.paper}</div></div>
            </div>
            <div className="spec-row">
              <div className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 10h.01M12 7h.01M16 10h.01M9 15h.01"/></svg></div>
              <div><div className="spec-label">{t.printColor}</div><div className="spec-value">{order.color}</div></div>
            </div>
            <div className="spec-row">
              <div className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg></div>
              <div><div className="spec-label">{t.sides}</div><div className="spec-value">{order.side}</div></div>
            </div>
            
            <div className="price-row">
              <span>{t.orderTotal}</span>
              <strong>{formatMoney(order.totalPrice || order.price || 0)}</strong>
            </div>
            <button 
              className="print-btn" 
              onClick={printSelected} 
              disabled={order.status === 'printing'}
            >
              {order.status === 'printing' ? (
                <><span className="btn-spinner"></span>{t.printing}…</>
              ) : (
                <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 15h12v7H6z"/></svg>{t.printJob} <span className="shortcut" style={{color: 'rgba(255,255,255,0.7)', marginLeft: '4px'}}>Space</span></>
              )}
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Primary navigation" style={{ WebkitAppRegion: 'drag' } as any}>
        <div className="brand" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <span className="brand-mark"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9"><path d="M6 9V4h12v5M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 15h12v7H6z"/></svg></span>
          <span className="brand-name">{t.brand} v2.0</span>
        </div>
        <nav className="nav" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <button className={`nav-button ${currentView === 'queue' ? 'active' : ''}`} onClick={() => setCurrentView('queue')}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
            <span>{t.ordersQueue}</span>
            <span className="nav-count">{orders.length}</span>
          </button>
          <button className={`nav-button ${currentView === 'completed' ? 'active' : ''}`} onClick={() => setCurrentView('completed')}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M20 11a8 8 0 1 1-3-6.2"/><path d="m9 11 2 2 7-7"/></svg>
            <span>{t.completed}</span>
          </button>
          <button className={`nav-button ${currentView === 'activity' ? 'active' : ''}`} onClick={() => setCurrentView('activity')}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M4 19h16M6 16l4-5 3 3 5-8"/></svg>
            <span>{t.activity}</span>
          </button>
          <button className={`nav-button ${currentView === 'settings' ? 'active' : ''}`} onClick={() => setCurrentView('settings')}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1 1.6v.2h-4V21a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1-2.8-2.8.1-.1a1.8 1.8 0 0 0 .4-2A1.8 1.8 0 0 0 3 14H2.8v-4H3a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.4-2l-.1-.1 2.8-2.8.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10 3V2.8h4V3a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2-.4l.1-.1 2.8 2.8-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1h.2v4H21a1.8 1.8 0 0 0-1.6 1Z"/></svg>
            <span>{t.settings}</span>
          </button>
        </nav>
        <div className="sidebar-spacer"></div>
        <button className="listener" onClick={togglePolling} style={{ WebkitAppRegion: 'no-drag' } as any}>
          <span className="listener-top">
            <span className={`signal ${isPolling ? 'listening' : 'paused'}`}></span>
            <span>{isPolling ? t.listening : t.paused}</span>
          </span>
          <small>{isPolling ? t.clickToPause : t.clickToResume}</small>
        </button>
      </aside>

      {/* Main Workspace */}
      <section className="workspace">
        {/* Ribbon */}
        <div className="ribbon" style={{ WebkitAppRegion: 'drag' } as any}>
          <div className="metric"><div className="metric-label">{t.todaysJobs}</div><div className="metric-value">{metrics.jobs}</div></div>
          <div className="metric"><div className="metric-label">{t.pagesPrinted}</div><div className="metric-value">{metrics.pages}</div></div>
          <div className="metric"><div className="metric-label">{t.todaysRevenue}</div><div className="metric-value">{formatMoney(metrics.revenue)}</div></div>
        </div>

        <main className="main" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <header className="app-header">
            {updateState.status === 'downloading' && (
              <div className="update-banner downloading">
                <span className="mini-spinner"></span>
                <span>Downloading Update v{updateState.version}... {Math.round(updateState.progress)}%</span>
              </div>
            )}
            
            {updateState.status === 'ready' && !updateState.force && (
              <div className={`update-banner ready ${orders.length === 0 ? 'urgent' : ''}`}>
                <div className="update-text">
                  <strong>Update v{updateState.version} Ready!</strong>
                  {orders.length === 0 ? 
                    <span> Queue is clear. This is the perfect time to update!</span> : 
                    <span> Please install when the queue is clear to avoid interrupting orders.</span>
                  }
                </div>
                <button className="primary-btn install-btn" onClick={() => window.ipcRenderer.invoke('install-update')}>
                  Install Now
                </button>
              </div>
            )}

            {updateState.status === 'ready' && updateState.force && (
              <div className="update-banner ready urgent">
                <span className="mini-spinner" style={{borderColor: 'white', borderTopColor: 'transparent'}}></span>
                <strong>CRITICAL UPDATE: Installing automatically...</strong>
              </div>
            )}

            <div className="heading-wrap">
              <div className="mobile-brand">{t.brand} console</div>
              <h1>{currentView === 'queue' ? t.ordersQueue : currentView === 'completed' ? t.completed : currentView === 'activity' ? t.activity : t.settings}</h1>
              <p className="subhead">
                {currentView === 'queue' ? t.queueSubtitle : currentView === 'completed' ? t.completedSubtitle : currentView === 'activity' ? t.activitySubtitle : t.settingsSubtitle}
              </p>
            </div>
            {currentView === 'queue' && (
              <div className="header-actions">
                <div className={`printer-pill ${printer.connected ? '' : 'offline'}`}>
                  <span className="dot"></span>
                  {printer.connected ? t.printerConnected : t.printerOffline} <span className="printerName" style={{opacity: 0.7}}>({printer.name})</span>
                </div>
                <button className="secondary-btn" onClick={() => { window.ipcRenderer.invoke('refresh-orders'); }}>
                  {t.refresh}
                </button>
                <button className="secondary-btn" onClick={simulateOrder}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                  {t.simulateOrder}
                </button>
              </div>
            )}
          </header>

          {/* Views */}
          {currentView === 'queue' && (
            <section className="view active">
              <div className="queue-grid">
                <div className="queue-pane">
                  <div className="section-row">
                    <span className="section-label">{t.liveQueue}</span>
                    <span className="shortcut"><kbd>↑</kbd><kbd>↓</kbd> {t.select} &nbsp; <kbd>Space</kbd> {t.print}</span>
                  </div>
                  <div className="order-list">
                    {orders.length === 0 ? (
                      <div className="setting-card"><h2>{t.queueClear}</h2><p>{t.queueClearDesc}</p></div>
                    ) : (
                      orders.map((o, i) => (
                        <button 
                          key={o.id} 
                          className={`order-card ${i === selected ? 'selected' : ''} ${o.fresh ? 'newly-added' : ''}`}
                          onClick={() => { setSelected(i); setIsMobileDetailOpen(true); }}
                        >
                          <div className="order-top">
                            <span className="order-num">#{o.id.substring(0,8)}</span>
                            {o.status === 'printing' ? <span className="status printing"><span className="mini-spinner"></span>{t.printing}</span> : <span className="status new">{t.new}</span>}
                          </div>
                          <div className="customer">{o.name}</div>
                          <div className="order-bottom">
                            <span>{o.ago}</span><span className="sep"></span><span>{o.totalPages || o.pages} {t.pages}</span><span className="sep"></span><span>{o.paper}</span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
                <aside className="detail-pane" id="desktopDetail">
                  {orders.length > 0 && <DetailPane order={currentOrder} />}
                </aside>
              </div>
            </section>
          )}

          {currentView === 'completed' && (
            <section className="view active">
              <div className="completed-list">
                {completed.map((o, i) => (
                  <article key={i} className="completed-card">
                    <div className="ready-row">
                      <div className="check-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/></svg></div>
                      <div><div className="order-num">#{o.id.substring(0,8)}</div><p>{o.name} · {o.pages} {t.pages}</p></div>
                      <span className="status ready">{t.ready}</span>
                    </div>
                    <div className="completed-foot">
                      <span>{t.completedText} {o.done}</span>
                      <strong>{formatMoney(o.price)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {currentView === 'activity' && (
            <section className="view active">
              <div className="activity-panel">
                {logs.map((log, i) => (
                  <div key={i} className="log-line">
                    <span className="log-time">{log.time}</span>
                    <span className={`log-level ${log.level}`}>{log.level.toUpperCase()}</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {currentView === 'settings' && (
            <section className="view active">
              <div className="settings-grid">
                <article className="setting-card">
                  <div className="setting-head">
                    <div className="setting-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 10V5h16v5M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 15h12v7H6z"/></svg></div>
                    <div>
                      <h2>{t.storeConnection}</h2>
                      <p>Store ID: {savedStoreId || 'Not Connected'}</p>
                      {savedStoreId && <div className="connected-text">{t.shopConnected}</div>}
                    </div>
                  </div>
                </article>
                
                <article className="setting-card">
                  <div className="setting-head">
                    <div className="setting-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h14v5H5zM5 15h14v5H5z"/><path d="M12 9v6M9 12l3 3 3-3"/></svg></div>
                    <div><h2>{t.autoPrint}</h2><p>{t.autoPrintDesc}</p></div>
                    <label className="switch">
                      <input type="checkbox" checked={isAutoPrintEnabled} onChange={async (e) => {
                        const val = e.target.checked;
                        await window.ipcRenderer.invoke('set-auto-print', val);
                        setIsAutoPrintEnabled(val);
                      }} />
                      <span className="track"></span>
                    </label>
                  </div>
                </article>

                <article className="setting-card wide">
                  <div className="setting-head">
                    <div className="setting-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                    <div>
                      <h2>Accept Online Orders</h2>
                      <p>Master switch to turn your shop ON or OFF for customers on the mobile app.</p>
                    </div>
                    <label className="switch" style={{marginLeft: 'auto'}}>
                      <input type="checkbox" checked={isAcceptingOrders} onChange={async (e) => {
                        const val = e.target.checked;
                        const success = await window.ipcRenderer.invoke('toggle-accepting-orders', val);
                        if (success) {
                          setIsAcceptingOrders(val);
                          showToast(val ? 'Store is now ONLINE' : 'Store is now OFFLINE');
                        } else {
                          showToast('Failed to update store status');
                        }
                      }} />
                      <span className="track"></span>
                    </label>
                  </div>
                </article>

                <article className="setting-card">
                  <div className="setting-head">
                    <div className="setting-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="m2 12 20 0"/><path d="m12 2 0 20"/></svg></div>
                    <div><h2>{t.language}</h2><p>Toggle language between English and Bangla</p></div>
                    <button className="secondary-btn" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} style={{marginLeft: 'auto'}}>
                      {t.toggleLanguage}
                    </button>
                  </div>
                </article>
                
                <article className="setting-card wide">
                  <div className="setting-head">
                    <div className="setting-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.4 2.1c-1.1.8-1.9 1.2-1.9 2.9M12 18h.01"/></svg></div>
                    <div>
                      <h2>{t.firstRun}</h2>
                      <p>Review the one-time setup screen shop owners use to connect their store on first launch.</p>
                      <div className="setting-actions"><button className="secondary-btn" onClick={() => { setIsModalOpen(true); setSetupStep(1); }}>{t.previewSetup}</button></div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}
        </main>
      </section>

      {/* Setup Modal */}
      {isModalOpen && (
        <div className="modal-backdrop open" onClick={(e) => { if ((e.target as any).className === 'modal-backdrop open') setIsModalOpen(false) }}>
          <div className="modal">
            {setupStep === 1 ? (
              <div id="setupFormState">
                <div className="modal-top">
                  <div><h2>{t.connectShop}</h2><p>Enter the store ID from your PrintPanda merchant dashboard.</p></div>
                  <button className="close-btn" onClick={() => setIsModalOpen(false)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
                </div>
                <div className="setup-steps"><span className="active"></span><span></span></div>
                <div className="field">
                  <label>{t.storeIdText}</label>
                  <input value={storeId} onChange={e => setStoreId(e.target.value)} placeholder="e.g. PP-DHK-118" />
                </div>
                <div className="modal-actions">
                  <button className="ghost-btn" onClick={() => setIsModalOpen(false)}>{t.cancel}</button>
                  <button className="primary-btn" onClick={connectShop}>{t.connectShop}</button>
                </div>
              </div>
            ) : (
              <div className="connected-state">
                <div className="check-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/></svg></div>
                <h2>{t.shopConnected}</h2>
                <p>Ready to receive online print orders.</p>
                <div className="setup-steps"><span className="active"></span><span className="active"></span></div>
                <button className="primary-btn" onClick={() => setIsModalOpen(false)}>{t.continueOrders}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Detail Panel */}
      {isMobileDetailOpen && (
        <div className="mobile-detail open" hidden={false}>
          <button className="secondary-btn mobile-back" onClick={() => setIsMobileDetailOpen(false)}>← Back</button>
          <aside className="detail-pane" style={{display: 'block'}}>
            {orders.length > 0 && <DetailPane order={currentOrder} />}
          </aside>
        </div>
      )}

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/></svg>
        <span>{toast.text}</span>
      </div>
    </div>
  );
}
