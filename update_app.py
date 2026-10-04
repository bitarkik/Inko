import re

with open('apps/desktop-agent/src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix translations
text = text.replace('autoPrint: "???-???????",', 'autoPrint: "???-???????",\n      startupText: "????????? ???? ???? ????",\n      startupDesc: "????????? ???? ?????? ???? ???? ??????? ?????????????? ??????",')

# Fix duplicated article
dup_article = '''
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
                  </div>
                </article>'''

text = text.replace(dup_article + '\n' + dup_article, dup_article)
text = text.replace(dup_article + '\n\n' + dup_article, dup_article)
# Try regex if it still didn't remove duplicate
text = re.sub(r'(<article className="setting-card">\s*<div className="setting-head">\s*<div className="setting-symbol">.*?<p>\{t.startupDesc\}</p></div>.*?<span className="track"></span>\s*</label>\s*</div>\s*</article>\s*){2,}', dup_article, text, flags=re.DOTALL)

# Fix unused simulateOrder
text = re.sub(r'const simulateOrder = \(\) => \{.*?playChime\(\);\n    \};\n', '', text, flags=re.DOTALL)

# Fix unused idx
text = text.replace('const mapped = updatedOrders.map((o: any, idx: number) => ({', 'const mapped = updatedOrders.map((o: any) => ({')

with open('apps/desktop-agent/src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

