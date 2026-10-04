import re

with open("apps/server/prisma/schema.prisma", "r", encoding="utf-8") as f:
    schema = f.read()

schema = re.sub(r"\s*printAttempts\s+Int\s+@default\(0\)", "", schema)

with open("apps/server/prisma/schema.prisma", "w", encoding="utf-8") as f:
    f.write(schema)
