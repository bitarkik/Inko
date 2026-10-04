with open("apps/server/src/stores/stores.controller.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("Controller,", "Controller, Delete,")

with open("apps/server/src/stores/stores.controller.ts", "w", encoding="utf-8") as f:
    f.write(text)
