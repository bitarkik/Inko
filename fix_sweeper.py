import re

with open("apps/server/src/app.module.ts", "r", encoding="utf-8") as f:
    text = f.read()

if "ScheduleModule.forRoot()" not in text:
    text = text.replace("import { Module } from '@nestjs/common';", "import { Module } from '@nestjs/common';\nimport { ScheduleModule } from '@nestjs/schedule';")
    text = text.replace("imports: [", "imports: [\n    ScheduleModule.forRoot(),")
    with open("apps/server/src/app.module.ts", "w", encoding="utf-8") as f:
        f.write(text)

with open("apps/server/src/orders/orders.service.ts", "r", encoding="utf-8") as f:
    text = f.read()

sweeper = """
  @Cron(CronExpression.EVERY_MINUTE)
  async sweepStuckOrders() {
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
    await this.prisma.order.updateMany({
      where: {
        status: 'PRINTING',
        updatedAt: { lt: tenMinsAgo }
      },
      data: { status: 'NEEDS_ATTENTION' }
    });
  }
"""
if "sweepStuckOrders" not in text:
    text = text.replace("import { Injectable", "import { Injectable, NotFoundException }\nimport { Cron, CronExpression } from '@nestjs/schedule'")
    text = text.replace("async getHistory", sweeper.strip() + "\n\n  async getHistory")
    with open("apps/server/src/orders/orders.service.ts", "w", encoding="utf-8") as f:
        f.write(text)
