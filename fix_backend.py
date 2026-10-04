import re

# 1. Fix orders.service.ts
with open("apps/server/src/orders/orders.service.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("import { Injectable } from '@nestjs/common';", "import { Injectable } from '@nestjs/common';\nimport { Cron, CronExpression } from '@nestjs/schedule';")

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
text = text.replace("async getHistory", sweeper.strip() + "\n\n  async getHistory")
text = re.sub(r"\s*findAll\(\) \{\s*return this\.prisma\.order\.findMany\(\);\s*\}", "", text)
text = re.sub(r'async\s*\n\s*}', '}', text) # Fallback if async is left

with open("apps/server/src/orders/orders.service.ts", "w", encoding="utf-8") as f:
    f.write(text)


# 2. Fix stores.controller.ts
with open("apps/server/src/stores/stores.controller.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, BadRequestException } from '@nestjs/common';", "import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, BadRequestException, Delete } from '@nestjs/common';")
revoke_ctrl = """
  @Delete(':storeId/device-tokens/:tokenId')
  @UseGuards(AgentGuard)
  revokeDeviceToken(@Param('storeId') storeId: string, @Param('tokenId') tokenId: string) {
    return this.storesService.revokeDeviceToken(tokenId, storeId);
  }

  @Post('pairing-code')
"""
text = text.replace("@Post('pairing-code')", revoke_ctrl.strip())
with open("apps/server/src/stores/stores.controller.ts", "w", encoding="utf-8") as f:
    f.write(text)


# 3. Fix stores.service.ts
with open("apps/server/src/stores/stores.service.ts", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("import { Injectable }", "import { Injectable, NotFoundException }")

public_select = """
  async findAll() {
    return this.prisma.store.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        address: true,
        contactNumber: true,
        email: true,
        latitude: true,
        longitude: true,
        isAcceptingOrders: true,
        status: true,
        bwRate: true,
        colorRate: true,
        singleSidedRate: true,
        doubleSidedRate: true,
      }
    });
  }
"""
text = re.sub(r"async findAll\(\) \{\s*return this\.prisma\.store\.findMany\(\{\s*where: \{ status: 'ACTIVE' \},\s*\}\);\s*\}", public_select.strip(), text)

revoke_srv = """
  async revokeDeviceToken(tokenId: string, storeId: string) {
    const token = await this.prisma.deviceToken.findUnique({ where: { id: tokenId } });
    if (!token || token.storeId !== storeId) {
      throw new NotFoundException('Device token not found for this store');
    }
    await this.prisma.deviceToken.delete({ where: { id: tokenId } });
    return { success: true };
  }
"""
text = text.replace("async generatePairingCode(storeId: string) {", revoke_srv + "\n  async generatePairingCode(storeId: string) {")
with open("apps/server/src/stores/stores.service.ts", "w", encoding="utf-8") as f:
    f.write(text)

