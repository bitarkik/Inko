import { app, BrowserWindow, ipcMain, dialog, Notification } from 'electron'
import { autoUpdater } from 'electron-updater'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import axios from 'axios'
import fs from 'fs'
import { exec } from 'child_process'
import ptp from 'pdf-to-printer'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

const API_URL = 'https://api.printitbyinko.com';
const POLL_INTERVAL_MS = 5000;
const TEMP_DIR = path.join(app.getPath('userData'), 'temp-prints');
const CONFIG_PATH = path.join(app.getPath('userData'), 'printpanda-config.json');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Config Management
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    }
  } catch (e) {
    console.error("Failed to load config", e);
  }
  return { storeId: '', isAutoPrintEnabled: false };
}

function saveConfig(data: any) {
  try {
    const current = loadConfig();
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ ...current, ...data }, null, 2));
  } catch (e) {
    console.error("Failed to save config", e);
  }
}

// PrintIt by Inko Agent State
const initialConfig = loadConfig();
let storeId: string | null = initialConfig.storeId || null;
let agentToken: string | null = initialConfig.agentToken || null;
if (agentToken) { axios.defaults.headers.common['X-Agent-Token'] = agentToken; }
let isPolling = false;
let isAutoPrintEnabled = initialConfig.isAutoPrintEnabled || false;
let pollTimeout: NodeJS.Timeout | null = null;


function sendLog(message: string) {
  console.log(message);
  win?.webContents.send('agent-log', message);
}

async function updateOrderStatus(orderId: string, status: string) {
  try {
    await axios.patch(`${API_URL}/orders/${orderId}/status`, { status });
    sendLog(`[Status] Order ${orderId} updated to ${status}`);
  } catch (error: any) {
    sendLog(`[Error] Failed to update order ${orderId} to ${status}: ${error.message}`);
    throw error;
  }
}
const printAttempts = new Map<string, number>();

async function handlePrintFailure(orderId: string) {
  const attempts = (printAttempts.get(orderId) || 0) + 1;
  printAttempts.set(orderId, attempts);
  
  if (attempts >= 3) {
    sendLog(`[System] Order ${orderId} failed 3 times. Marking as NEEDS_ATTENTION.`);
    try {
      await updateOrderStatus(orderId, "NEEDS_ATTENTION");
    } catch (e: any) { sendLog(`[Error] Failed to mark ${orderId} as NEEDS_ATTENTION: ${e.message}`); }
  } else {
    sendLog(`[System] Reverting order ${orderId} to READY_TO_PRINT (Attempt ${attempts}/3).`);
    try {
      await updateOrderStatus(orderId, "READY_TO_PRINT");
    } catch (e: any) { sendLog(`[Error] Failed to revert status for ${orderId}: ${e.message}`); }
  }
}

let isPrinting = false;
async function processOrder(order: any, isAuto: boolean) {
  if (isPrinting) {
    sendLog(`[System] Printer busy, waiting to process ${order.id}...`);
    while (isPrinting) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  isPrinting = true;
  try {
    const { id } = order;
    sendLog(`[Agent] Processing order: ${id}`);
    
    try {
      await updateOrderStatus(id, "PRINTING");
    } catch (e) {
      sendLog(`[Error] Aborting processOrder for ${id} because status update failed.`);
      return;
    }

    const localFilePath = path.join(TEMP_DIR, `order-${id}.pdf`);

    sendLog(`[Agent] Downloading PDF for order ${id}...`);
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL}/orders/${id}/download`,
        responseType: "stream",
        timeout: 30000,
      });

      const writer = fs.createWriteStream(localFilePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      sendLog(`[Agent] Download complete: ${localFilePath}`);
    } catch (error: any) {
      sendLog(`[Error] Failed to download PDF for order ${id}: ${error.message}`);
      await handlePrintFailure(id);
      return;
    }

    // --- COVER PAGE LOGIC ---
    try {
      const coverPath = path.join(TEMP_DIR, `cover-${id}.pdf`);
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      page.drawText('PrintIt by Inko', { x: 50, y: height - 100, size: 40, font });
      page.drawText(`Order Number: ${id}`, { x: 50, y: height - 180, size: 24, font });
      
      const details = [
        `Customer: ${order.user?.name || order.customerName || 'Guest'}`,
        `Copies: ${order.copies || 1}`,
        `Side: ${order.sidedMode || 'Single'}`,
        `Color: ${order.colorMode || 'B&W'}`
      ];
      
      details.forEach((text, idx) => {
        page.drawText(text, { x: 50, y: height - 240 - (idx * 30), size: 18, font: fontRegular });
      });
      
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(coverPath, pdfBytes);
      
      sendLog(`[Print Spooler] Printing cover page for ${id}...`);
      await ptp.print(coverPath);
      
      // Give the spooler a brief moment
      await new Promise(r => setTimeout(r, 1000));
      if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
    } catch (coverErr: any) {
      sendLog(`[Warning] Failed to print cover page for ${id}: ${coverErr.message}`);
    }
    // ------------------------

    sendLog(`[Print Spooler] Sending job to printer: ${localFilePath}`);
    try {
      await ptp.print(localFilePath, { copies: order.copies || 1, side: (order.sidedMode === 'Duplex' || order.sidedMode === 'Double side') ? 'duplex' : 'simplex' });
      sendLog(`[Print Spooler] Job successfully sent to printer for order ${id}.`);
    } catch (error: any) {
      sendLog(`[Error] Print failed for order ${id}: ${error.message}`);
      await handlePrintFailure(id);
    }

    // Clean up the temp file
    fs.unlink(localFilePath, (err) => {
      if (err) {
        sendLog(`[Error] Failed to delete file ${localFilePath}: ${err.message}`);
      } else {
        sendLog(`[Agent] Cleaned up temporary file`);
      }
    });

    if (isAuto) {
      sendLog(`[Agent] Print job dispatched for order: ${id}. Waiting for staff to mark as ready.`);
    }
  } finally {
    isPrinting = false;
  }
}

async function triggerManualFetch() {
  if (!storeId) return;
  try {
    const response = await axios.get(`${API_URL}/orders/ready-to-print?storeId=${storeId}`);
    const orders = response.data;
    sendLog(`[Diagnostic] Fetched ${orders.length} ready-to-print orders!`); 
    win?.webContents.send("orders-updated", orders);
  } catch (e: any) { sendLog(`[Error] Failed to fetch orders: ${e.message}`); }
}

async function poll() {
  if (!isPolling || !storeId) return;

  try {
    const response = await axios.get(`${API_URL}/orders/ready-to-print?storeId=${storeId}`);
    const orders = response.data;
    
    win?.webContents.send("orders-updated", orders);

    if (orders && orders.length > 0) {
      if (isAutoPrintEnabled) {
        const nextOrder = orders.find((o: any) => o.status === "READY_TO_PRINT");
        if (nextOrder) {
          sendLog(`[Auto-Print] Processing oldest READY_TO_PRINT order...`);
          await processOrder(nextOrder, true);
        }
      }
    }
  } catch (error: any) {
    sendLog(`[Error] Polling failed: ${error.message}`);
  } finally {
    if (isPolling) {
      pollTimeout = setTimeout(poll, POLL_INTERVAL_MS);
    }
  }
}

// --- IPC Handlers ---
ipcMain.handle('setup-agent', async (event, setupCode: string) => {
  try {
    const os = require('os');
    const response = await axios.post(`${API_URL}/stores/setup`, { setupCode, label: os.hostname() });
    const { token, storeId: newStoreId } = response.data;
    storeId = newStoreId;
    axios.defaults.headers.common['X-Agent-Token'] = token;
    saveConfig({ storeId, agentToken: token });
    sendLog(`[System] Store ID set to: ${storeId}`);
    startPolling();
    return { success: true, storeId };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
});
ipcMain.handle('set-startup', (event, enabled: boolean) => {
  app.setLoginItemSettings({ openAtLogin: enabled });
  saveConfig({ startup: enabled });
  return true;
});
ipcMain.handle('get-startup', () => {
  return app.getLoginItemSettings().openAtLogin;
});

ipcMain.handle('show-notification', (event, title: string, body: string) => {
  if (Notification.isSupported()) {
    new Notification({ title, body }).show();
  }
});


ipcMain.handle('get-config', () => {
  return { storeId, isAutoPrintEnabled };
});

ipcMain.handle('get-api-url', () => {
  return API_URL;
});



ipcMain.handle('get-store-info', async () => {
  if (!storeId) return null;
  try {
    const response = await axios.get(`${API_URL}/stores/${storeId}/dashboard`);
    return response.data.store;
  } catch (e) {
    return null;
  }
});

ipcMain.handle('toggle-accepting-orders', async (event, isAccepting: boolean) => {
  if (!storeId) return false;
  try {
    await axios.patch(`${API_URL}/stores/${storeId}/accepting-orders`, { isAccepting });
    return true;
  } catch (e) {
    return false;
  }
});

ipcMain.handle('set-store-id', (event, newStoreId: string) => {
  storeId = newStoreId;
  saveConfig({ storeId });
  sendLog(`[System] Store ID set to: ${storeId}`);
  
  // If we weren't polling but now we have an ID, start automatically polling? 
  // Let's let the UI handle it or the user click 'Start Listening', 
  // but if we are already polling, it'll use the new ID.
  return true;
});

ipcMain.handle('clear-store-id', () => {
  storeId = '';
  saveConfig({ storeId: '', agentToken: '' }); agentToken = ''; delete axios.defaults.headers.common['X-Agent-Token'];
  sendLog(`[System] Store ID cleared`);
  return true;
});

function startPolling() {
  if (!storeId) return { success: false, error: 'Store ID not set' };
  if (isPolling) return { success: true, message: 'Already polling' };
  
  isPolling = true;
  sendLog(`[System] Started polling for Store: ${storeId}`);
  poll();
  return { success: true };
}

ipcMain.handle('start-polling', (event) => {
  return startPolling();
});

ipcMain.handle('stop-polling', (event) => {
  isPolling = false;
  if (pollTimeout) clearTimeout(pollTimeout);
  sendLog(`[System] Stopped polling.`);
  return { success: true };
});

ipcMain.handle('set-auto-print', (event, enabled: boolean) => {
  isAutoPrintEnabled = enabled;
  saveConfig({ isAutoPrintEnabled });
  sendLog(`[System] Auto-Print is now ${enabled ? 'ENABLED' : 'DISABLED'}`);
  return true;
});

ipcMain.handle('get-auto-print', () => {
  return isAutoPrintEnabled;
});

ipcMain.handle('print-order', async (event, order: any) => {
  sendLog(`[Manual Print] Staff triggered print for ${order.id}`);
  processOrder(order, false).catch(e => console.error(e));
  return true;
});

// Owner presses "Mark as Ready" in the UI after confirming paper came out of the printer
ipcMain.handle('mark-order-ready', async (event, orderId: string) => {
  sendLog(`[Manual] Staff marked order ${orderId} as ready for pickup`);
  await updateOrderStatus(orderId, 'READY_TO_PICKUP');
  win?.webContents.send('order-completed', { id: orderId });
  await triggerManualFetch();
  return true;
});

// Owner presses "Reject" in the UI
ipcMain.handle('reject-order', async (event, orderId: string) => {
  sendLog(`[Manual] Staff rejected order ${orderId}`);
  await updateOrderStatus(orderId, 'CANCELLED');
  win?.webContents.send('order-rejected', { id: orderId });
  await triggerManualFetch();
  return true;
});


ipcMain.handle('refresh-orders', async () => {
  await triggerManualFetch();
  autoUpdater.checkForUpdates();
  return true;
});

ipcMain.handle('get-history', async (event, days: number = 7) => {
  if (!storeId) return [];
  try {
    const response = await axios.get(`${API_URL}/orders/history?storeId=${storeId}&days=${days}`);
    return response.data;
  } catch (e: any) {
    sendLog(`[Error] Failed to fetch history: ${e.message}`);
    return [];
  }
});

ipcMain.handle('get-printer-status', async () => {
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
});

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: `PrintIt by Inko Agent v${app.getVersion()}`,
    icon: path.join(process.env.VITE_PUBLIC, 'vite.svg'),
    autoHideMenuBar: true, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      plugins: true
    },
  })

  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

app.whenReady().then(() => {
  createWindow();

  autoUpdater.autoDownload = true;
  autoUpdater.checkForUpdates();
  
  // Check for updates every 15 minutes while the app is running
  setInterval(() => {
    sendLog('[System] Checking for updates in the background...');
    autoUpdater.checkForUpdates();
  }, 15 * 60 * 1000);

  autoUpdater.on('update-available', (info) => {
    sendLog(`[System] Update v${info.version} is available. Downloading...`);
    win?.webContents.send('update-available', info);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    win?.webContents.send('update-progress', progressObj.percent);
  });

  let pendingForceUpdate = false;
  autoUpdater.on('update-downloaded', (info) => {
    sendLog(`[System] Update v${info.version} downloaded.`);
    
    const releaseNotes = (info.releaseNotes || '').toString().toUpperCase();
    const isForceUpdate = releaseNotes.includes('[FORCE_UPDATE]');
    
    win?.webContents.send('update-downloaded', { version: info.version, force: isForceUpdate });

    if (isForceUpdate) {
      sendLog('[System] FORCE UPDATE detected. Will install when idle.');
      pendingForceUpdate = true;
      checkAndInstallUpdate();
    }
  });

  function checkAndInstallUpdate() {
    if (pendingForceUpdate && !isPrinting) {
      sendLog('[System] Installing force update now...');
      autoUpdater.quitAndInstall();
    } else if (pendingForceUpdate) {
      setTimeout(checkAndInstallUpdate, 5000);
    }
  }
})

ipcMain.handle('install-update', () => {
  sendLog('[System] User initiated update install.');
  autoUpdater.quitAndInstall();
});















}

