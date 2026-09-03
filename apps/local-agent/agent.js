"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
dotenv.config();
const API_URL = process.env.API_URL || 'http://localhost:3000';
const POLL_INTERVAL_MS = 5000;
const TEMP_DIR = path.join(__dirname, 'temp-prints');
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}
async function updateOrderStatus(orderId, status) {
    try {
        await axios_1.default.patch(`${API_URL}/orders/${orderId}/status`, { status });
        console.log(`[Status] Order ${orderId} updated to ${status}`);
    }
    catch (error) {
        console.error(`[Error] Failed to update order ${orderId} to ${status}:`, error.message);
    }
}
async function processOrder(order) {
    const { id } = order;
    console.log(`[Agent] Found ready order: ${id}`);
    const localFilePath = path.join(TEMP_DIR, `order-${id}.pdf`);
    // 1. Download the PDF stream
    console.log(`[Agent] Downloading PDF for order ${id}...`);
    try {
        const response = await (0, axios_1.default)({
            method: 'GET',
            url: `${API_URL}/orders/${id}/download`,
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(localFilePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        console.log(`[Agent] Download complete: ${localFilePath}`);
    }
    catch (error) {
        console.error(`[Error] Failed to download PDF for order ${id}:`, error.message);
        return; // abort printing
    }
    // 2. Update to PRINTING
    await updateOrderStatus(id, 'PRINTING');
    // 3. Hardware Execution
    console.log(`[Print Spooler] Sending job to Windows Print Spooler: ${localFilePath}`);
    const printCommand = `powershell.exe -Command "Start-Process -FilePath '${localFilePath}' -Verb Print -PassThru | %{sleep 30;$_} | kill"`;
    await new Promise((resolve, reject) => {
        (0, child_process_1.exec)(printCommand, (error, stdout, stderr) => {
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
        console.log(`[Agent] Cleaned up temporary file: ${localFilePath}`);
    }
    catch (err) {
        console.error(`[Error] Failed to delete file ${localFilePath}:`, err.message);
    }
    console.log(`[Agent] Finished processing order: ${id}`);
}
async function poll() {
    try {
        const response = await axios_1.default.get(`${API_URL}/orders/ready-to-print`);
        const order = response.data;
        if (order) {
            await processOrder(order);
        }
        else {
            console.log('[Agent] No orders ready to print. Waiting...');
        }
    }
    catch (error) {
        console.error('[Error] Polling failed:', error.message);
    }
    finally {
        setTimeout(poll, POLL_INTERVAL_MS);
    }
}
console.log('[Agent] Starting local hardware agent...');
poll();
