import { useState, useEffect } from 'react'

function App() {
  const [storeId, setStoreId] = useState('')
  const [savedStoreId, setSavedStoreId] = useState('')
  const [isPolling, setIsPolling] = useState(false)
  const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const handleAgentLog = (_event: any, message: string) => {
      setLogs((prevLogs) => [message, ...prevLogs].slice(0, 100))
    }

    const handleOrdersUpdated = (_event: any, updatedOrders: any[]) => {
      setOrders(updatedOrders)
    }

    window.ipcRenderer.on('agent-log', handleAgentLog)
    window.ipcRenderer.on('orders-updated', handleOrdersUpdated)

    // Load initial auto-print state
    window.ipcRenderer.invoke('get-auto-print').then((enabled: boolean) => {
      setIsAutoPrintEnabled(enabled)
    })

    return () => {
      window.ipcRenderer.off('agent-log', handleAgentLog)
      window.ipcRenderer.off('orders-updated', handleOrdersUpdated)
    }
  }, [])

  const handleSaveStoreId = async () => {
    if (!storeId) return
    const success = await window.ipcRenderer.invoke('set-store-id', storeId)
    if (success) {
      setSavedStoreId(storeId)
    }
  }

  const togglePolling = async () => {
    if (isPolling) {
      await window.ipcRenderer.invoke('stop-polling')
      setIsPolling(false)
    } else {
      const res = await window.ipcRenderer.invoke('start-polling')
      if (res.success) {
        setIsPolling(true)
      } else {
        alert(res.error)
      }
    }
  }

  const toggleAutoPrint = async () => {
    const newVal = !isAutoPrintEnabled;
    await window.ipcRenderer.invoke('set-auto-print', newVal);
    setIsAutoPrintEnabled(newVal);
  }

  const handleManualPrint = async (order: any) => {
    await window.ipcRenderer.invoke('print-order', order);
  }

  const handleRefresh = async () => {
    await window.ipcRenderer.invoke('refresh-orders');
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ marginTop: 0 }}>🐼 PrintPanda Agent Dashboard</h1>
      
      {/* Configuration Header */}
      <div style={{ background: '#f4f4f5', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <strong>Store ID:</strong>
          <input 
            type="text" 
            placeholder="Enter Store ID" 
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            disabled={isPolling}
            style={{ padding: '0.4rem', fontSize: '1rem', width: '200px' }}
          />
          <button 
            onClick={handleSaveStoreId} 
            disabled={isPolling || !storeId}
            style={{ padding: '0.4rem 1rem', cursor: 'pointer' }}
          >
            Save
          </button>
          {savedStoreId && <span style={{ color: 'green', marginLeft: '0.5rem' }}>✓ Bound</span>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
            <input 
              type="checkbox" 
              checked={isAutoPrintEnabled} 
              onChange={toggleAutoPrint}
              style={{ width: '1.2rem', height: '1.2rem' }}
            />
            Auto-Print (with Cover Pages)
          </label>
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0, marginBottom: '1.5rem' }}>
        
        {/* Left Column: Order Queue */}
        <div style={{ flex: 1, background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1rem', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>🖨️ Pending Queue</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={handleRefresh}
                disabled={!isPolling}
                style={{ padding: '0.4rem 1rem', cursor: isPolling ? 'pointer' : 'not-allowed' }}
              >
                ↻ Refresh
              </button>
              <button 
                onClick={togglePolling}
                disabled={!savedStoreId}
                style={{ 
                  padding: '0.4rem 1rem', 
                  cursor: savedStoreId ? 'pointer' : 'not-allowed',
                  background: isPolling ? '#ef4444' : '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                {isPolling ? '⏹ Stop Polling' : '▶ Start Polling'}
              </button>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {!isPolling && <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem' }}>Start polling to fetch orders...</div>}
            
            {isPolling && orders.length === 0 && <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem' }}>No pending orders. Queue is empty.</div>}
            
            {isPolling && orders.map(order => (
              <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Order: {order.id.split('-')[0]}...</div>
                  <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                    Pages: {order.totalPages} | Price: ${Number(order.totalPrice).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <button 
                  onClick={() => handleManualPrint(order)}
                  disabled={isAutoPrintEnabled}
                  style={{
                    background: isAutoPrintEnabled ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: isAutoPrintEnabled ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Print Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Terminal Logs */}
        <div style={{ flex: 1, background: '#1e1e1e', color: '#10b981', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'monospace' }}>
          <div style={{ padding: '0.5rem 1rem', background: '#2d2d2d', borderBottom: '1px solid #404040', color: '#fff', fontWeight: 'bold' }}>
            System Logs
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', fontSize: '0.9rem' }}>
            {logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '0.25rem', opacity: index === 0 ? 1 : 0.8 }}>{log}</div>
            ))}
            {logs.length === 0 && <div style={{ color: '#666' }}>Waiting for activity...</div>}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
