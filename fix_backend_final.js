const fs = require('fs');

// orders.service.ts
let orders = fs.readFileSync('apps/server/src/orders/orders.service.ts', 'utf8');
orders = orders.replace(/\s*async\s*\n\s*\}/g, '\n}');
if (!orders.includes('CronExpression')) {
  orders = orders.replace("import { Injectable, NotFoundException } from '@nestjs/common';", "import { Injectable, NotFoundException } from '@nestjs/common';\nimport { Cron, CronExpression } from '@nestjs/schedule';");
}
fs.writeFileSync('apps/server/src/orders/orders.service.ts', orders);

// stores.controller.ts
let stores = fs.readFileSync('apps/server/src/stores/stores.controller.ts', 'utf8');
if (!stores.includes('Delete,')) {
  stores = stores.replace("import { Controller,", "import { Controller, Delete,");
}
fs.writeFileSync('apps/server/src/stores/stores.controller.ts', stores);
console.log('Success');
