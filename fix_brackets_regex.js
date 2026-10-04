const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

const regex = /\}\);\s*\}\);\s*\}\);\s*\}\);\s*function createWindow\(\)/m;
text = text.replace(regex, `});\n});\n\nfunction createWindow()`);

fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
console.log('Fixed regex');
