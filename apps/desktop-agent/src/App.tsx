import { useState, useEffect } from 'react'

function App() {
  const [storeId, setStoreId] = useState('')
  const [savedStoreId, setSavedStoreId] = useState('')
  const [isPolling, setIsPolling] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const handleAgentLog = (_event: any, message: string) => {
      setLogs((prevLogs) => [...prevLogs, message])
    }

    // Listen for agent logs from the Electron Main Process
    window.ipcRenderer.on('agent-log', handleAgentLog)

    return () => {
      window.ipcRenderer.off('agent-log', handleAgentLog)
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

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🐼 PrintPanda Local Agent</h1>
      
      <div style={{ background: '#f4f4f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>⚙️ Configuration</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Enter Store ID" 
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            disabled={isPolling}
            style={{ padding: '0.5rem', fontSize: '1rem', flex: 1 }}
          />
          <button 
            onClick={handleSaveStoreId} 
            disabled={isPolling || !storeId}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
          >
            Save
          </button>
        </div>
        {savedStoreId && <p style={{ color: 'green', marginTop: '1rem' }}>✓ Bound to Store: <strong>{savedStoreId}</strong></p>}
      </div>

      <div style={{ background: '#f4f4f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>🖨️ Print Queue</h2>
        <button 
          onClick={togglePolling}
          disabled={!savedStoreId}
          style={{ 
            padding: '1rem 2rem', 
            fontSize: '1.2rem', 
            cursor: savedStoreId ? 'pointer' : 'not-allowed',
            background: isPolling ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            width: '100%'
          }}
        >
          {isPolling ? '⏹ Stop Polling' : '▶ Start Polling'}
        </button>
      </div>

      <div style={{ background: '#1e1e1e', color: '#10b981', padding: '1.5rem', borderRadius: '8px', height: '300px', overflowY: 'auto', fontFamily: 'monospace' }}>
        <h3 style={{ marginTop: 0, color: 'white' }}>Terminal Logs</h3>
        {logs.map((log, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>{log}</div>
        ))}
        {logs.length === 0 && <div style={{ color: '#666' }}>Waiting for activity...</div>}
      </div>
    </div>
  )
}

export default App
