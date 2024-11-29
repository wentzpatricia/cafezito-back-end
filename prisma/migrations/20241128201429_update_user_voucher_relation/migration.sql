/*
  Warnings:

  - You are about to drop the column `userId` on the `VoucherPromotional` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VoucherPromotional" DROP CONSTRAINT "VoucherPromotional_userId_fkey";

-- DropIndex
DROP INDEX "VoucherPromotional_voucher_userId_key";

-- AlterTable
ALTER TABLE "VoucherPromotional" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserVoucher" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVoucher_userId_voucherId_key" ON "UserVoucher"("userId", "voucherId");

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "VoucherPromotional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
