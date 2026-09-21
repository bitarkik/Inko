import { app, BrowserWindow, ipcMain } from 'electron'
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
let pollTimeout: NodeJS.Timeout | null = null;
const API_URL = 'https://printpanda-api.onrender.com'; // Production NestJS backend port
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

async function processOrder(order: any) {
  const { id } = order;
  sendLog(`[Agent ${storeId}] Found ready order: ${id}`);
  
  const localFilePath = path.join(TEMP_DIR, `order-${id}.pdf`);

  sendLog(`[Agent ${storeId}] Downloading PDF for order ${id}...`);
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
    sendLog(`[Agent ${storeId}] Download complete: ${localFilePath}`);
  } catch (error: any) {
    sendLog(`[Error] Failed to download PDF for order ${id}: ${error.message}`);
    return;
  }

  await updateOrderStatus(id, 'PRINTING');

  sendLog(`[Print Spooler] Sending job to Windows Print Spooler: ${localFilePath}`);
  const printCommand = `powershell.exe -Command "Start-Process -FilePath '${localFilePath}' -Verb Print -PassThru | %{sleep 30;$_} | kill"`;
  
  await new Promise<void>((resolve, reject) => {
    exec(printCommand, (error, stdout, stderr) => {
      if (error) {
        sendLog(`[Error] Failed to print document ${localFilePath}: ${error.message}`);
        return reject(error);
      }
      resolve();
    });
  });

  await updateOrderStatus(id, 'READY_TO_PICKUP');
  
  try {
    fs.unlinkSync(localFilePath);
    sendLog(`[Agent ${storeId}] Cleaned up temporary file`);
  } catch (err: any) {
    sendLog(`[Error] Failed to delete file ${localFilePath}: ${err.message}`);
  }

  sendLog(`[Agent ${storeId}] Finished processing order: ${id}`);
}

async function poll() {
  if (!isPolling || !storeId) return;

  try {
    const response = await axios.get(`${API_URL}/orders/ready-to-print?storeId=${storeId}`);
    const order = response.data;

    if (order) {
      await processOrder(order);
    } else {
      sendLog(`[Agent ${storeId}] No orders ready to print. Waiting...`);
    }
  } catch (error: any) {
    sendLog(`[Error] Polling failed: ${error.message}`);
  } finally {
    if (isPolling) {
      pollTimeout = setTimeout(poll, POLL_INTERVAL_MS);
    }
  }
}

// IPC Handlers
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

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(process.env.VITE_PUBLIC, 'vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
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

app.whenReady().then(createWindow)
