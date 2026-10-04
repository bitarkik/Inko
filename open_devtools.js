const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

text = text.replace("autoHideMenuBar: true,", "autoHideMenuBar: true, webPreferences: { preload: path.join(__dirname, 'preload.mjs'), nodeIntegration: false, contextIsolation: true },");
if (!text.includes('win.webContents.openDevTools();')) {
  text = text.replace('win.loadFile(path.join(process.env.APP_ROOT, \'dist/index.html\'));\n  }', 'win.loadFile(path.join(process.env.APP_ROOT, \'dist/index.html\'));\n    win.webContents.openDevTools();\n  }');
  text = text.replace('win.loadURL(process.env.VITE_DEV_SERVER_URL);\n  }', 'win.loadURL(process.env.VITE_DEV_SERVER_URL);\n    win.webContents.openDevTools();\n  }');
}

fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
console.log('Success');
