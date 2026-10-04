import re

with open("apps/desktop-agent/electron/main.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Blocker 1: Replace processOrder entirely
new_process_order = """
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
      await ptp.print(localFilePath, { copies: order.copies || 1, sides: (order.sidedMode === 'Duplex' || order.sidedMode === 'Double side') ? 'duplex' : undefined });
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
"""

text = re.sub(r'let isPrinting = false;\nasync function processOrder\(order: any, isAuto: boolean\) \{.*?\n\}\n', new_process_order.strip() + '\n', text, flags=re.DOTALL)


# Blocker 2: setup-agent IPC
setup_ipc = """
ipcMain.handle('setup-agent', async (event, setupCode: string) => {
  try {
    const response = await axios.post(`${API_URL}/stores/setup`, { setupCode });
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
"""
text = text.replace("// --- IPC Handlers ---", "// --- IPC Handlers ---\n" + setup_ipc.strip())

# 18. Remove dead validate-store IPC
text = re.sub(r"ipcMain\.handle\('validate-store'.*?\}\);", "", text, flags=re.DOTALL)

with open("apps/desktop-agent/electron/main.ts", "w", encoding="utf-8") as f:
    f.write(text)
