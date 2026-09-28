import re

with open('apps/desktop-agent/src/DetailPane.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Add loadError state
code = code.replace(
    '  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);',
    '  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);\n  const [loadError, setLoadError] = useState<string | null>(null);'
)

# Replace useEffect
pattern_effect = r"  useEffect\(\(\) => \{\n    if \(\!order\?\.fileUrl\) return;\n    let isMounted = true;\n    const loadPdf = async \(\) => \{.*?\n  \}, \[order\?\.id, apiUrl\]\);"
new_effect = """  useEffect(() => {
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
  }, [order?.id, order?.fileUrl, apiUrl]);"""

code = re.sub(pattern_effect, new_effect, code, flags=re.DOTALL)

# Replace UI
pattern_ui = r"          <div className=\"doc\" style=\{\{ padding: 0, border: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' \}\}>\n            \{pdfDoc \? \(\n              <div style=\{\{boxShadow: '0 4px 6px -1px rgba\(0, 0, 0, 0.1\)', background: 'white'\}\}>\n                <canvas ref=\{canvasRef\} style=\{\{display: 'block'\}\}></canvas>\n              </div>\n            \) : \(\n              <div style=\{\{ margin: 'auto', padding: '40px', color: 'var\(--mute\)' \}\}>\n                <span className=\"mini-spinner\" style=\{\{borderTopColor: 'var\(--mute\)'\}\}></span>\n              </div>\n            \)\}\n          </div>"

new_ui = """          <div className="doc" style={{ padding: 0, border: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
          </div>"""

code = re.sub(pattern_ui, new_ui, code, flags=re.DOTALL)

with open('apps/desktop-agent/src/DetailPane.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
