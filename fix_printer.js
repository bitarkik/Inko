const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

const oldCode = `ipcMain.handle('get-printer-status', async () => {
  return new Promise((resolve) => {
    exec('powershell.exe -Command "Get-Printer | Select-Object Name, PrinterStatus | ConvertTo-Json"', (err, stdout) => {
      if (err) {
        resolve({ connected: false, name: 'Unknown', status: 'Error' });
        return;
      }
      try {
        let printers = JSON.parse(stdout);
        if (!Array.isArray(printers)) printers = [printers];
        const printer = printers.find((p: any) => p.Name && !p.Name.includes('PDF') && !p.Name.includes('XPS') && !p.Name.includes('OneNote')) || printers[0];
        if (printer) {
          const isConnected = printer.PrinterStatus === 'Normal' || printer.PrinterStatus === 3 || printer.PrinterStatus === 0;
          resolve({ connected: isConnected, name: printer.Name, status: printer.PrinterStatus });
        } else {
          resolve({ connected: false, name: 'No Printer Found', status: 'Offline' });
        }
      } catch (e) {
        resolve({ connected: false, name: 'Error Parsing', status: 'Unknown' });
      }
    });
  });
});`;

const newCode = `ipcMain.handle('get-printer-status', async () => {
  return new Promise(async (resolve) => {
    try {
      const def = await ptp.getDefaultPrinter().catch(() => null);
      if (def && def.name) {
        resolve({ connected: true, name: def.name, status: 'Normal' });
        return;
      }
    } catch(e) {}

    exec('powershell.exe -Command "Get-Printer | Select-Object Name, PrinterStatus | ConvertTo-Json"', (err, stdout) => {
      if (err) {
        resolve({ connected: false, name: 'Unknown', status: 'Error' });
        return;
      }
      try {
        let printers = JSON.parse(stdout);
        if (!Array.isArray(printers)) printers = [printers];
        const printer = printers.find((p: any) => p.Name && !/PDF|XPS|OneNote|Fax/i.test(p.Name)) || printers[0];
        if (printer) {
          const isConnected = printer.PrinterStatus === 'Normal' || printer.PrinterStatus === 3 || printer.PrinterStatus === 0;
          resolve({ connected: isConnected, name: printer.Name, status: printer.PrinterStatus });
        } else {
          resolve({ connected: false, name: 'No Printer Found', status: 'Offline' });
        }
      } catch (e) {
        resolve({ connected: false, name: 'Error Parsing', status: 'Unknown' });
      }
    });
  });
});`;

if (text.includes("ipcMain.handle('get-printer-status'")) {
  // Regex to replace the entire old block, since exact formatting might slightly differ
  const regex = /ipcMain\.handle\('get-printer-status'[\s\S]*?\}\);\s*\}\);/m;
  text = text.replace(regex, newCode);
  fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
  console.log('Replaced');
}
