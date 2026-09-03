import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

dotenv.config();

const STORE_ID = process.env.STORE_ID;
if (!STORE_ID) {
  console.error('[Error] STORE_ID environment variable is missing. The agent must be bound to a specific store.');
  process.exit(1);
}

const API_URL = process.env.API_URL || 'http://localhost:3000';
const POLL_INTERVAL_MS = 5000;
const TEMP_DIR = path.join(__dirname, 'temp-prints');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

async function updateOrderStatus(orderId: string, status: string) {
  try {
    await axios.patch(`${API_URL}/orders/${orderId}/status`, { status });
    console.log(`[Status] Order ${orderId} updated to ${status}`);
  } catch (error: any) {
    console.error(`[Error] Failed to update order ${orderId} to ${status}:`, error.message);
  }
}

async function processOrder(order: any) {
  const { id } = order;
  console.log(`[Agent ${STORE_ID}] Found ready order: ${id}`);
  
  const localFilePath = path.join(TEMP_DIR, `order-${id}.pdf`);

  // 1. Download the PDF stream
  console.log(`[Agent ${STORE_ID}] Downloading PDF for order ${id}...`);
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
    console.log(`[Agent ${STORE_ID}] Download complete: ${localFilePath}`);
  } catch (error: any) {
    console.error(`[Error] Failed to download PDF for order ${id}:`, error.message);
    return; // abort printing
  }

  // 2. Update to PRINTING
  await updateOrderStatus(id, 'PRINTING');

  // 3. Hardware Execution
  console.log(`[Print Spooler] Sending job to Windows Print Spooler: ${localFilePath}`);
  const printCommand = `powershell.exe -Command "Start-Process -FilePath '${localFilePath}' -Verb Print -PassThru | %{sleep 30;$_} | kill"`;
  
  await new Promise<void>((resolve, reject) => {
    exec(printCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`[Error] Failed to print document ${localFilePath}:`, error.message);
        return reject(error);
      }
      resolve();
    });
  });

  // 4. Update to READY_TO_PICKUP
  await updateOrderStatus(id, 'READY_TO_PICKUP');
  
  // 5. Cleanup temporary file
  try {
    fs.unlinkSync(localFilePath);
    console.log(`[Agent ${STORE_ID}] Cleaned up temporary file: ${localFilePath}`);
  } catch (err: any) {
    console.error(`[Error] Failed to delete file ${localFilePath}:`, err.message);
  }

  console.log(`[Agent ${STORE_ID}] Finished processing order: ${id}`);
}

async function poll() {
  try {
    const response = await axios.get(`${API_URL}/orders/ready-to-print?storeId=${STORE_ID}`);
    const order = response.data;

    if (order) {
      await processOrder(order);
    } else {
      console.log(`[Agent ${STORE_ID}] No orders ready to print. Waiting...`);
    }
  } catch (error: any) {
    console.error(`[Error] Polling failed:`, error.message);
  } finally {
    setTimeout(poll, POLL_INTERVAL_MS);
  }
}

console.log(`[Agent] Starting local hardware agent for Store: ${STORE_ID}`);
poll();
