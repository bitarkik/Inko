import re

with open("apps/server/src/orders/orders.service.ts", "r", encoding="utf-8") as f:
    text = f.read()
text = re.sub(r'\n\s*async\s*\n\s*}', '\n}', text)
if 'import { Cron, CronExpression } from "@nestjs/schedule";' not in text:
    text = text.replace("import { Injectable } from '@nestjs/common';", "import { Injectable } from '@nestjs/common';\nimport { Cron, CronExpression } from \"@nestjs/schedule\";")
with open("apps/server/src/orders/orders.service.ts", "w", encoding="utf-8") as f:
    f.write(text)

with open("apps/server/src/stores/stores.controller.ts", "r", encoding="utf-8") as f:
    text = f.read()
if "Delete" not in text.split("from '@nestjs/common';")[0]:
    text = text.replace("import { Controller,", "import { Controller, Delete,")
with open("apps/server/src/stores/stores.controller.ts", "w", encoding="utf-8") as f:
    f.write(text)

with open("apps/server/src/stores/stores.service.ts", "r", encoding="utf-8") as f:
    text = f.read()
text = text.replace("        bwRate: true,\n", "")
text = text.replace("        colorRate: true,\n", "")
text = text.replace("        singleSidedRate: true,\n", "")
text = text.replace("        doubleSidedRate: true,\n", "")
text = text.replace("        bwRate: true,", "")
with open("apps/server/src/stores/stores.service.ts", "w", encoding="utf-8") as f:
    f.write(text)
