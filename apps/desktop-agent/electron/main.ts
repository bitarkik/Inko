import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import axios from 'axios'
import fs from 'fs'
import { exec } from 'child_process'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

const API_URL = 'https://printpanda-api.onrender.com';
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

// PrintPanda Agent State
const initialConfig = loadConfig();
let storeId: string | null = initialConfig.storeId || null;
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
  }
}

async function printFile(filePath: string, isTextFile = false) {
  return new Promise<void>((resolve, reject) => {
    let printCommand = "";
    if (isTextFile) {
      printCommand = `notepad /p "${filePath}"`;
    } else {
      printCommand = `powershell.exe -Command "Start-Process -FilePath '${filePath}' -Verb Print -PassThru | %{sleep 30;$_} | kill"`;
    }
    
    exec(printCommand, (error, stdout, stderr) => {
      if (error) {
        sendLog(`[Error] Failed to print document ${filePath}: ${error.message}`);
        return reject(error);
      }
      resolve();
    });
  });
}

async function processOrder(order: any, isAuto: boolean) {
  const { id } = order;
  sendLog(`[Agent] Processing order: ${id}`);
  
  await updateOrderStatus(id, 'PRINTING');

  const localFilePath = path.join(TEMP_DIR, `order-${id}.pdf`);

  sendLog(`[Agent] Downloading PDF for order ${id}...`);
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_URL}/orders/${id}/download`,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(localFilePath);
    response.data.pipe(writer);

    await new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    sendLog(`[Agent] Download complete: ${localFilePath}`);
  } catch (error: any) {
    sendLog(`[Error] Failed to download PDF for order ${id}: ${error.message}`);
    return;
  }

  if (isAuto) {
    sendLog(`[Print Spooler] Printing cover page for order ${id}...`);
    const coverPagePath = path.join(TEMP_DIR, `cover-${id}.txt`);
    const coverText = `PRINTPANDA AUTOMATED ORDER\n\nOrder ID: ${id}\nPages: ${order.totalPages}\nPrice: BDT ${order.totalPrice}\n\n======================\nEnd of Cover Page\n`;
    fs.writeFileSync(coverPagePath, coverText);
    try {
      await printFile(coverPagePath, true);
      fs.unlinkSync(coverPagePath);
    } catch (e) {
      sendLog(`[Error] Failed to print cover page.`);
    }
  }

  sendLog(`[Print Spooler] Sending job to Windows Print Spooler: ${localFilePath}`);
  try {
    await printFile(localFilePath, false);
  } catch (error) {
  }

  await updateOrderStatus(id, 'READY_TO_PICKUP');
  
  try {
    fs.unlinkSync(localFilePath);
    sendLog(`[Agent] Cleaned up temporary file`);
  } catch (err: any) {
    sendLog(`[Error] Failed to delete file ${localFilePath}: ${err.message}`);
  }

  sendLog(`[Agent] Finished processing order: ${id}`);
  
  win?.webContents.send('order-completed', order);
  
  triggerManualFetch();
}

async function triggerManualFetch() {
  if (!storeId) return;
  try {
    const response = await axios.get(`${API_URL}/orders/ready-to-print?storeId=${storeId}`);
    const orders = response.data;
    win?.webContents.send('orders-updated', orders);
  } catch (e) {}
}

async function poll() {
  if (!isPolling || !storeId) return;

  try {
    const response = await axios.get(`${API_URL}/orders/ready-to-print?storeId=${storeId}`);
    const orders = response.data;
    
    win?.webContents.send('orders-updated', orders);

    if (orders && orders.length > 0) {
      if (isAutoPrintEnabled) {
        sendLog(`[Auto-Print] Processing oldest order in queue...`);
        await processOrder(orders[0], true);
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

ipcMain.handle('get-config', () => {
  return { storeId, isAutoPrintEnabled };
});

ipcMain.handle('validate-store', async (event, checkStoreId: string) => {
  try {
    const response = await axios.get(`${API_URL}/stores/${checkStoreId}/dashboard`);
    return response.data.store ? true : false;
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

ipcMain.handle('start-polling', (event) => {
  if (!storeId) return { success: false, error: 'Store ID not set' };
  if (isPolling) return { success: true, message: 'Already polling' };
  
  isPolling = true;
  sendLog(`[System] Started polling for Store: ${storeId}`);
  poll();
  return { success: true };
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

ipcMain.handle('refresh-orders', async () => {
  await triggerManualFetch();
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
    title: `PrintPanda Agent v${app.getVersion()}`,
    icon: path.join(process.env.VITE_PUBLIC, 'vite.svg'),
    autoHideMenuBar: true, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
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

app.whenReady().then(() => {
  createWindow();

  autoUpdater.autoDownload = true;
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', (info) => {
    sendLog(`[System] Update v${info.version} is available. Downloading...`);
    win?.webContents.send('update-available', info);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    win?.webContents.send('update-progress', progressObj.percent);
  });

  autoUpdater.on('update-downloaded', (info) => {
    sendLog(`[System] Update v${info.version} downloaded.`);
    
    // Check if the developer put [FORCE_UPDATE] in the github release notes
    const releaseNotes = (info.releaseNotes || '').toString().toUpperCase();
    const isForceUpdate = releaseNotes.includes('[FORCE_UPDATE]');
    
    win?.webContents.send('update-downloaded', { version: info.version, force: isForceUpdate });

    if (isForceUpdate) {
      sendLog('[System] FORCE UPDATE detected. Installing in 5 seconds...');
      setTimeout(() => {
        autoUpdater.quitAndInstall();
      }, 5000);
    }
  });
})

ipcMain.handle('install-update', () => {
  sendLog('[System] User initiated update install.');
  autoUpdater.quitAndInstall();
});
