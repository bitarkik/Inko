-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "isAcceptingOrders" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastPingAt" TIMESTAMP(3);
