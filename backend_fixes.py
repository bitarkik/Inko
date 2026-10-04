import re

# 1. AgentGuard (Fix #6)
with open("apps/server/src/auth/agent.guard.ts", "r", encoding="utf-8") as f:
    guard = f.read()

guard_check = """
    // Attach store to request for convenience
    request.store = deviceToken.store;
    request.deviceToken = deviceToken;

    const clientStoreId = request.query.storeId || request.params.storeId || request.body.storeId;
    if (clientStoreId && clientStoreId !== deviceToken.storeId) {
      throw new UnauthorizedException('Token is not valid for the requested store');
    }
"""
guard = guard.replace("""
    // Attach store to request for convenience
    request.store = deviceToken.store;
    request.deviceToken = deviceToken;
""", guard_check)
with open("apps/server/src/auth/agent.guard.ts", "w", encoding="utf-8") as f:
    f.write(guard)

# 2. Remove GET /orders (Fix #7)
with open("apps/server/src/orders/orders.controller.ts", "r", encoding="utf-8") as f:
    orders_ctrl = f.read()
orders_ctrl = re.sub(r"\s*@Get\(\)\s*findAll\(\) \{\s*return this\.ordersService\.findAll\(\);\s*\}", "", orders_ctrl)
with open("apps/server/src/orders/orders.controller.ts", "w", encoding="utf-8") as f:
    f.write(orders_ctrl)

with open("apps/server/src/orders/orders.service.ts", "r", encoding="utf-8") as f:
    orders_srv = f.read()
orders_srv = re.sub(r"\s*findAll\(\) \{\s*return this\.prisma\.order\.findMany\(\);\s*\}", "", orders_srv)
with open("apps/server/src/orders/orders.service.ts", "w", encoding="utf-8") as f:
    f.write(orders_srv)

# 3. GET /stores public fields only (Fix #8)
with open("apps/server/src/stores/stores.service.ts", "r", encoding="utf-8") as f:
    stores_srv = f.read()

public_select = """
  async findAll() {
    return this.prisma.store.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        lat: true,
        lng: true,
        isAcceptingOrders: true,
        bwRate: true,
        colorRate: true,
        singleSidedRate: true,
        doubleSidedRate: true,
      }
    });
  }
"""
stores_srv = re.sub(r"async findAll\(\) \{\s*return this\.prisma\.store\.findMany\(\{\s*where: \{ status: 'ACTIVE' \},\s*\}\);\s*\}", public_select.strip(), stores_srv)

# Add revocation to stores_srv
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
stores_srv = stores_srv.replace("async generatePairingCode(storeId: string) {", revoke_srv + "\n  async generatePairingCode(storeId: string) {")
if "import { Injectable, NotFoundException" not in stores_srv:
    stores_srv = stores_srv.replace("import { Injectable", "import { Injectable, NotFoundException")

with open("apps/server/src/stores/stores.service.ts", "w", encoding="utf-8") as f:
    f.write(stores_srv)

# 4. Device token revocation endpoint (Fix #5)
with open("apps/server/src/stores/stores.controller.ts", "r", encoding="utf-8") as f:
    stores_ctrl = f.read()

revoke_ctrl = """
  @Delete(':storeId/device-tokens/:tokenId')
  @UseGuards(AgentGuard)
  revokeDeviceToken(@Param('storeId') storeId: string, @Param('tokenId') tokenId: string) {
    return this.storesService.revokeDeviceToken(tokenId, storeId);
  }

  @Post('pairing-code')
"""
stores_ctrl = stores_ctrl.replace("@Post('pairing-code')", revoke_ctrl.strip())
with open("apps/server/src/stores/stores.controller.ts", "w", encoding="utf-8") as f:
    f.write(stores_ctrl)

