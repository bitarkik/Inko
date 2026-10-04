const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

text = text.replace(
  'const __dirname = path.dirname(fileURLToPath(import.meta.url))',
  `const MAIN_DIR = path.dirname(fileURLToPath(import.meta.url))
const __dirname = MAIN_DIR

const sumatraPdfPath = app.isPackaged
  ? path.join(process.resourcesPath, 'SumatraPDF-3.4.6-32.exe')
  : path.join(MAIN_DIR, '..', 'node_modules', 'pdf-to-printer', 'dist', 'SumatraPDF-3.4.6-32.exe');`
);

text = text.replace(
  'await ptp.print(coverPath);',
  'await ptp.print(coverPath, { sumatraPdfPath });'
);

text = text.replace(
  "await ptp.print(localFilePath, { copies: order.copies || 1, side: (order.sidedMode === 'Duplex' || order.sidedMode === 'Double side') ? 'duplex' : 'simplex' });",
  "await ptp.print(localFilePath, { copies: order.copies || 1, side: (order.sidedMode === 'Duplex' || order.sidedMode === 'Double side') ? 'duplex' : 'simplex', sumatraPdfPath });"
);

fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
console.log('Success');
