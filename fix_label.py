import re

with open("apps/desktop-agent/electron/main.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("const response = await axios.post(`${API_URL}/stores/setup`, { setupCode });", "const os = require('os');\n    const response = await axios.post(`${API_URL}/stores/setup`, { setupCode, label: os.hostname() });")

with open("apps/desktop-agent/electron/main.ts", "w", encoding="utf-8") as f:
    f.write(text)

with open("apps/server/src/stores/stores.controller.ts", "r", encoding="utf-8") as f:
    text = f.read()
text = text.replace("@Body('setupCode') setupCode: string", "@Body('setupCode') setupCode: string, @Body('label') label?: string")
text = text.replace("return this.storesService.setupAgent(setupCode);", "return this.storesService.setupAgent(setupCode, label);")
with open("apps/server/src/stores/stores.controller.ts", "w", encoding="utf-8") as f:
    f.write(text)

with open("apps/server/src/stores/stores.service.ts", "r", encoding="utf-8") as f:
    text = f.read()
text = text.replace("async setupAgent(setupCode: string)", "async setupAgent(setupCode: string, label?: string)")
text = text.replace("data: { token, storeId: setup.storeId }", "data: { token, storeId: setup.storeId, label }")
with open("apps/server/src/stores/stores.service.ts", "w", encoding="utf-8") as f:
    f.write(text)
