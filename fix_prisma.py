with open("apps/server/prisma/schema.prisma", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("model DeviceToken {\n  id", "model DeviceToken {\n  id          String   @id @default(cuid())\n  label       String?")

with open("apps/server/prisma/schema.prisma", "w", encoding="utf-8") as f:
    f.write(text)
