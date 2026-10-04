import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export const DetailPane = React.memo(({ order, apiUrl, t, formatMoney, printSelected }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    setPdfDoc(null);
    setLoadError(null);
    setNumPages(0);
    setCurrentPage(1);
    
    if (!order?.fileUrl) {
      setLoadError('No file attached to this order');
      return;
    }
    
    const loadPdf = async () => {
      try {
        const response = await fetch(`${apiUrl}/orders/${order.id}/download`);
        if (!response.ok) {
           throw new Error('File not found or server error');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setCurrentPage(1);
        }
      } catch (err: any) {
        console.error('Error loading PDF', err);
        if (isMounted) {
          setLoadError(err.message || 'Failed to load PDF');
        }
      }
    };
    loadPdf();
    return () => { isMounted = false; };
  }, [order?.id, order?.fileUrl, apiUrl]);

  useEffect(() => {
    let renderTask: any = null;
    if (pdfDoc && canvasRef.current) {
      const renderPage = async () => {
        try {
          const page = await pdfDoc.getPage(currentPage);
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = canvasRef.current!;
          const context = canvas.getContext('2d')!;

          const scale = Math.min(1.5, 380 / viewport.width);
          const scaledViewport = page.getViewport({ scale });
          const pixelRatio = window.devicePixelRatio || 1;

          canvas.height = scaledViewport.height * pixelRatio;
          canvas.width = scaledViewport.width * pixelRatio;
          canvas.style.height = `${scaledViewport.height}px`;
          canvas.style.width = `${scaledViewport.width}px`;

          const renderContext: any = {
            canvasContext: context,
            viewport: scaledViewport,
            transform: [pixelRatio, 0, 0, pixelRatio, 0, 0]
          };
          
          renderTask = page.render(renderContext);
        } catch (e) {
          console.error('Render cancelled', e);
        }
      };
      renderPage();
    }
    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, currentPage]);

  if (!order) return null;

  return (
    <article className="detail-card">
      <div className="detail-head">
        <div>
          <div className="detail-title">Token #{order.id.slice(-4).toUpperCase()}</div>
          <div className="detail-meta">{order.name} &bull; {t.pdfDocument}</div>
        </div>
        {order.status === 'printing' ? <span className="status printing"><span className="mini-spinner"></span>{t.printing}</span> : order.status === 'NEEDS_ATTENTION' ? <span className="status" style={{background: '#fee2e2', color: '#ef4444'}}>Needs Attention</span> : <span className="status new">{t.new}</span>}
      </div>
      <div className="detail-body">
        <div className="preview-stage" style={{ padding: 0, overflow: 'hidden', background: '#e5e7eb', position: 'relative' }}>
          <div className="doc" style={{ padding: 0, border: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {loadError ? (
              <div style={{ margin: 'auto', padding: '40px', color: '#ef4444', textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '40px', marginBottom: '12px'}}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <div style={{fontWeight: 600, fontSize: '13px'}}>{loadError}</div>
                <div style={{fontSize: '12px', marginTop: '4px', opacity: 0.8}}>The document could not be loaded</div>
              </div>
            ) : pdfDoc ? (
              <div style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', background: 'white'}}>
                <canvas ref={canvasRef} style={{display: 'block'}}></canvas>
              </div>
            ) : (
              <div style={{ margin: 'auto', padding: '40px', color: 'var(--mute)' }}>
                <span className="mini-spinner" style={{borderTopColor: 'var(--mute)'}}></span>
              </div>
            )}
          </div>
          {numPages > 0 && (
            <div className="page-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                style={{ background: 'transparent', border: 'none', color: currentPage === 1 ? 'rgba(255,255,255,0.4)' : 'white', cursor: currentPage === 1 ? 'default' : 'pointer', padding: '0 4px' }}
              >
                &lt;
              </button>
              {currentPage} / {numPages}
              <button 
                onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} 
                disabled={currentPage === numPages}
                style={{ background: 'transparent', border: 'none', color: currentPage === numPages ? 'rgba(255,255,255,0.4)' : 'white', cursor: currentPage === numPages ? 'default' : 'pointer', padding: '0 4px' }}
              >
                &gt;
              </button>
            </div>
          )}
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
          {order.status === 'printing' ? (
            // Job is in the printer queue — show "Mark as Ready" for owner to confirm
            <button 
              className="print-btn done"
              onClick={() => window.ipcRenderer.invoke('mark-order-ready', order.id)}
              style={{ background: '#2563eb' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
              Mark as Ready for Pickup
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button 
                className="secondary-btn" 
                onClick={() => setShowRejectModal(true)}
                style={{ flex: '0 0 auto', padding: '0 16px', border: '1px solid #fee2e2', color: '#ef4444', background: '#fef2f2', borderRadius: '10px' }}
                title="Reject Order"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: 20, height: 20}}><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
              <button 
                className="print-btn" 
                onClick={printSelected}
                style={{ flex: 1, marginTop: 0 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                Print
              </button>
            </div>
          )}
        </div>
      </div>

      {showRejectModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '360px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width: 24, height: 24}}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              Reject Order
            </h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px', lineHeight: 1.5 }}>
              Are you sure you want to reject this order? This cannot be undone and the customer will be notified.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowRejectModal(false)}
                disabled={isRejecting}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  setIsRejecting(true);
                  try {
                    await window.ipcRenderer.invoke('reject-order', order.id);
                    setShowRejectModal(false);
                  } catch(e) {
                    // silently fail for now
                  } finally {
                    setIsRejecting(false);
                  }
                }}
                disabled={isRejecting}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ef4444', color: 'white', cursor: isRejecting ? 'wait' : 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {isRejecting ? <span className="btn-spinner" style={{width: 14, height: 14, borderWidth: 2}}></span> : null}
                Reject Order
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
});


