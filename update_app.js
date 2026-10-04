const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/src/App.tsx', 'utf8');

// 1. Remove simulate order button
text = text.replace(/<button className="secondary-btn" onClick=\{simulateOrder\}>.*?<\/button>/s, '');
text = text.replace(/const simulateOrder = \(\) => \{.*?playChime\(\);\n    \};/s, '');

// 2. Fix color/side logic
text = text.replace(/color: o.colorMode \|\| \(idx % 2 === 0 \? 'Color' : 'B&W'\),/, "color: o.colorMode || '—',");
text = text.replace(/side: o.sides \|\| 'Single side',/, "side: o.sidedMode || '—',");

// 3. Unused idx
text = text.replace('const mapped = updatedOrders.map((o: any, idx: number) => ({', 'const mapped = updatedOrders.map((o: any) => ({');

// 4. Spacebar print removal
text = text.replace(/else if \(e\.code === 'Space'[^}]*printSelected\(\);\n\s*\}/s, '');

// 5. Connect shop modal logic fix
text = text.replace(/const isValid = await window.ipcRenderer.invoke\('validate-store', storeId\);\n\s*if \(!isValid\) \{\n\s*return showToast\('Invalid Setup Code'\);\n\s*\}/, "const result = await window.ipcRenderer.invoke('setup-agent', storeId);\n      if (!result.success) {\n        return showToast(result.error || 'Invalid Setup Code');\n      }");
text = text.replace(/await window.ipcRenderer.invoke\('set-store-id', storeId\);\n\s*setSavedStoreId\(storeId\);/, "setSavedStoreId(result.storeId);");

// 6. Print optimistic rollback
text = text.replace(/const printSelected = async \(\) => \{.*?await window.ipcRenderer.invoke\('print-order', o\);\n    \};/s, \const printSelected = async () => {\\n      if (!orders[selected] || orders[selected].status === 'printing') return;\\n      const o = orders[selected];\\n      const originalStatus = o.status;\\n      \\n      const newOrders = [...orders];\\n      newOrders[selected].status = 'printing';\\n      setOrders(newOrders);\\n      \\n      const result = await window.ipcRenderer.invoke('print-order', o);\\n      if (result && !result.success) {\\n        showToast('Print failed: ' + (result.error || 'Unknown error'));\\n        const reverted = [...orders];\\n        reverted[selected].status = originalStatus;\\n        setOrders(reverted);\\n      }\\n    };\);

// 7. Store ID to Setup Code Strings
text = text.replace(/storeIdText: "Store ID"/g, 'storeIdText: "Setup Code"');
text = text.replace(/storeIdText: "????? ????"/g, 'storeIdText: "????? ???"');
text = text.replace(/Enter Store ID/g, 'Enter Setup Code');
text = text.replace(/placeholder="e.g. PP-DHK-118"/, 'placeholder="e.g. A1B2C3D4"');

// 8. Disconnect modal strings
text = text.replace(/<button className="ghost-btn" style=\{\{color: '#ff4d4d'\}\} onClick=\{async \(\) => \{/g, '<button className="primary-btn" onClick={async () => {');
text = text.replace(/Turn OFF Store<\/button>/g, 'Turn OFF Store (Recommended)</button>');
text = text.replace(/<button className="primary-btn" onClick=\{async \(\) => \{/g, '<button className="ghost-btn" onClick={async () => {');
text = text.replace(/Keep ON<\/button>/g, 'Keep ON (Orders will accumulate unprinted)</button>');

// 9. Fix unbounded seenOrdersRef and add Notification
const newHandleOrders = \      const handleOrdersUpdated = (_e: any, updatedOrders: any[]) => {
        let newCount = 0;
        const currentIds = new Set<string>();
        updatedOrders.forEach(o => {
          currentIds.add(o.id);
          if (!seenOrdersRef.current.has(o.id)) {
            newCount++;
            seenOrdersRef.current.add(o.id);
          }
        });

        // Periodic cleanup
        if (seenOrdersRef.current.size > 500) {
          seenOrdersRef.current = currentIds;
        }

        if (newCount > 0) {
          playChime();
          window.ipcRenderer.invoke('show-notification', 'New Print Order', \\\You have \\\ new order(s) waiting.\\\);
        }\;
text = text.replace(/const handleOrdersUpdated = \(_e: any, updatedOrders: any\[\]\) => \{.*?\n\s*\};\n\n\s*if \(hasNew\) playChime\(\);/s, newHandleOrders);

// 10. Startup text strings
text = text.replace('autoPrint: "Auto-print",', 'autoPrint: "Auto-print",\\n      startupText: "Start with Windows",\\n      startupDesc: "Automatically run this app in the background when the computer starts.",');
text = text.replace('autoPrint: "???-???????",', 'autoPrint: "???-???????",\\n      startupText: "????????? ???? ???? ????",\\n      startupDesc: "????????? ???? ?????? ???? ???? ??????? ?????????????? ??????",');

// 11. Add startup toggles to State & UI
text = text.replace('const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState(false);', 'const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState(false);\\n    const [isStartupEnabled, setIsStartupEnabled] = useState(false);');
text = text.replace("setIsAutoPrintEnabled(config.isAutoPrintEnabled || false);", "setIsAutoPrintEnabled(config.isAutoPrintEnabled || false);\\n        window.ipcRenderer.invoke('get-startup').then((startup: boolean) => setIsStartupEnabled(startup));");
text = text.replace('const mapped = updatedOrders.map((o: any, idx: number) => ({', 'const mapped = updatedOrders.map((o: any) => ({');

const startupToggle = \
                </article>

                <article className="setting-card">
                  <div className="setting-head">
                    <div className="setting-symbol"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                    <div><h2>{t.startupText}</h2><p>{t.startupDesc}</p></div>
                    <label className="switch">
                      <input type="checkbox" checked={isStartupEnabled} onChange={async (e) => {
                        const val = e.target.checked;
                        await window.ipcRenderer.invoke('set-startup', val);
                        setIsStartupEnabled(val);
                      }} />
                      <span className="track"></span>
                    </label>
                  </div>\;
text = text.replace(/<\/article>\s*<article className="setting-card wide">/, startupToggle + '\\n                </article>\\n\\n                <article className="setting-card wide">');

// 12. Fix brand texts
text = text.replace(/appName: "PrintPanda Agent"/g, 'appName: "PrintIt by Inko"');
text = text.replace(/appName: "????????????? ??????"/g, 'appName: "PrintIt by Inko"');
text = text.replace(/v2.0/g, 'v2.2.9');

fs.writeFileSync('apps/desktop-agent/src/App.tsx', text);
console.log("Success");
