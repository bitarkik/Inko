import re
with open("apps/server/src/orders/orders.service.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("  async\n\n  async getOrdersByUser", "  async getOrdersByUser")
text = text.replace("  async\n  async getOrdersByUser", "  async getOrdersByUser")

with open("apps/server/src/orders/orders.service.ts", "w", encoding="utf-8") as f:
    f.write(text)
