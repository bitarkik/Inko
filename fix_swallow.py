import re

with open("apps/desktop-agent/electron/main.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("} catch (e) {}", "} catch (e: any) { sendLog(`[Error] Failed to revert status for ${orderId}: ${e.message}`); }")

with open("apps/desktop-agent/electron/main.ts", "w", encoding="utf-8") as f:
    f.write(text)
