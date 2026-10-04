const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/src/DetailPane.tsx', 'utf8');

const oldCode = `const response = await fetch(\`\${apiUrl}/orders/\${order.id}/download\`);
          if (!response.ok) {
             throw new Error('File not found or server error');
          }
          
          const arrayBuffer = await response.arrayBuffer();`;

const newCode = `const response = await window.ipcRenderer.invoke('fetch-order-pdf', order.id);
          if (!response.success) {
            if (response.status === 401 || response.status === 403) {
              throw new Error('Not authorized — please re-pair the agent');
            }
            throw new Error(response.error || 'File not found or server error');
          }
          
          const arrayBuffer = response.data;`;

text = text.replace(oldCode, newCode);
fs.writeFileSync('apps/desktop-agent/src/DetailPane.tsx', text);
