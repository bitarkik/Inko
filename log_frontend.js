const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

if (!text.includes('console-message')) {
  text = text.replace('win.webContents.openDevTools();', 'win.webContents.openDevTools();\n    win.webContents.on("console-message", (event, level, message, line, sourceId) => { console.log(`[Frontend] ${message} (at ${sourceId}:${line})`); });');
}

fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
console.log('Success');
