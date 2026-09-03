-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING_PAYMENT', 'QUEUED', 'PROCESSING', 'READY_TO_PRINT', 'PRINTING', 'READY_TO_PICKUP', 'COMPLETED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "fileUrl" TEXT NOT NULL,
    "totalPages" INTEGER NOT NULL,
    "colorPages" INTEGER[],
    "bwPages" INTEGER[],
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
