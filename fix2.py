import re
with open('apps/desktop-agent/electron/main.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('sendLog("[Print Spooler] Printing cover page for ...");', 'sendLog(`[Print Spooler] Printing cover page for ${id}...`);')
text = text.replace('sendLog("[Warning] Failed to print cover page for : ");', 'sendLog(`[Warning] Failed to print cover page for ${id}: ${coverErr.message}`);')
text = text.replace('sendLog("[Print Spooler] Sending job to printer: ${localFilePath}");', 'sendLog(`[Print Spooler] Sending job to printer: ${localFilePath}`);')

with open('apps/desktop-agent/electron/main.ts', 'w', encoding='utf-8') as f:
    f.write(text)
