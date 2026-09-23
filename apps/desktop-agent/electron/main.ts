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

// PrintPanda Agent State
let storeId: string | null = null;
let isPolling = false;
let isAutoPrintEnabled = false;
let pollTimeout: NodeJS.Timeout | null = null;
const API_URL = 'https://printpanda-api.onrender.com';
const POLL_INTERVAL_MS = 5000;
const TEMP_DIR = path.join(app.getPath('userData'), 'temp-prints');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

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
      // Use notepad for simple text receipts to avoid pdf application errors
      printCommand = `notepad /p "${filePath}"`;
    } else {
      // Use powershell for PDF
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
  
  // 1. Mark as printing so it gets removed from the queue
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

  // 2. Print Cover Page (only in Auto mode)
  if (isAuto) {
    sendLog(`[Print Spooler] Printing cover page for order ${id}...`);
    const coverPagePath = path.join(TEMP_DIR, `cover-${id}.txt`);
    const coverText = `PRINTPANDA AUTOMATED ORDER\n\nOrder ID: ${id}\nPages: ${order.totalPages}\nPrice: $${order.totalPrice}\n\n======================\nEnd of Cover Page\n`;
    fs.writeFileSync(coverPagePath, coverText);
    try {
      await printFile(coverPagePath, true);
      fs.unlinkSync(coverPagePath);
    } catch (e) {
      sendLog(`[Error] Failed to print cover page.`);
    }
  }

  // 3. Print PDF
  sendLog(`[Print Spooler] Sending job to Windows Print Spooler: ${localFilePath}`);
  try {
    await printFile(localFilePath, false);
  } catch (error) {
    // We already logged the error inside printFile
  }

  // 4. Update status and cleanup
  await updateOrderStatus(id, 'READY_TO_PICKUP');
  
  try {
    fs.unlinkSync(localFilePath);
    sendLog(`[Agent] Cleaned up temporary file`);
  } catch (err: any) {
    sendLog(`[Error] Failed to delete file ${localFilePath}: ${err.message}`);
  }

  sendLog(`[Agent] Finished processing order: ${id}`);
  
  // Refresh UI queue instantly
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
    
    // Broadcast to UI dashboard
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

ipcMain.handle('set-store-id', (event, newStoreId: string) => {
  storeId = newStoreId;
  sendLog(`[System] Store ID set to: ${storeId}`);
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
  sendLog(`[System] Auto-Print is now ${enabled ? 'ENABLED' : 'DISABLED'}`);
  return true;
});

ipcMain.handle('get-auto-print', () => {
  return isAutoPrintEnabled;
});

ipcMain.handle('print-order', async (event, order: any) => {
  sendLog(`[Manual Print] Staff triggered print for ${order.id}`);
  // Run processing in background so UI doesn't block IPC completely
  processOrder(order, false).catch(e => console.error(e));
  return true;
});

ipcMain.handle('refresh-orders', async () => {
  await triggerManualFetch();
  return true;
});

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC, 'vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
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

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    sendLog('[System] A new update is available. Downloading now...');
  });

  autoUpdater.on('update-downloaded', () => {
    sendLog('[System] Update downloaded. Restarting the application to apply the update...');
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 3000);
  });
})
