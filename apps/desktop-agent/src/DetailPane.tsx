import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export const DetailPane = React.memo(({ order, apiUrl, t, formatMoney, printSelected }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    if (!order?.fileUrl) return;
    let isMounted = true;
    const loadPdf = async () => {
      try {
        const response = await fetch(`${apiUrl}/orders/${order.id}/download`);
        const arrayBuffer = await response.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Error loading PDF', err);
      }
    };
    loadPdf();
    return () => { isMounted = false; };
  }, [order?.id, apiUrl]);

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

          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;

          const renderContext: any = {
            canvasContext: context,
            viewport: scaledViewport,
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
        {order.status === 'printing' ? <span className="status printing"><span className="mini-spinner"></span>{t.printing}</span> : <span className="status new">{t.new}</span>}
      </div>
      <div className="detail-body">
        <div className="preview-stage" style={{ padding: 0, overflow: 'hidden', background: '#e5e7eb' }}>
          <div className="doc" style={{ padding: 0, border: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {pdfDoc ? (
              <div style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', background: 'white'}}>
                <canvas ref={canvasRef} style={{display: 'block'}}></canvas>
              </div>
            ) : (
              <div style={{ margin: 'auto', padding: '40px', color: 'var(--mute)' }}>
                <span className="mini-spinner" style={{borderTopColor: 'var(--mute)'}}></span>
              </div>
            )}
          </div>
          {numPages > 0 && <span className="page-badge">{currentPage} / {numPages}</span>}
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
              <><span className="btn-spinner"></span>{t.printing}...</>
            ) : (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg> Print <span>Space</span></>
            )}
          </button>
        </div>
      </div>
    </article>
  );
});
