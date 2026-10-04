const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

const newIpc = `ipcMain.handle('fetch-order-pdf', async (event, orderId: string) => {
  try {
    const response = await axios.get(\`\${API_URL}/orders/\${orderId}/download\`, {
      responseType: 'arraybuffer'
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      error: error.response?.data?.message || error.message
    };
  }
});\n\n`;

if (!text.includes('fetch-order-pdf')) {
  text = text.replace("ipcMain.handle('get-history',", newIpc + "ipcMain.handle('get-history',");
  fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
}
