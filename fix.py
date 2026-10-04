import re

with open('apps/desktop-agent/electron/main.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'sendLog\(\[System\] Update v downloaded.\);', 'sendLog(`[System] Update v${info.version} downloaded.`);', text)

with open('apps/desktop-agent/electron/main.ts', 'w', encoding='utf-8') as f:
    f.write(text)
