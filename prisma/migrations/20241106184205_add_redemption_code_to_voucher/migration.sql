/*
  Warnings:

  - A unique constraint covering the columns `[voucher,userId]` on the table `VoucherPromotional` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "VoucherPromotional" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VoucherPromotional_voucher_userId_key" ON "VoucherPromotional"("voucher", "userId");

-- AddForeignKey
ALTER TABLE "VoucherPromotional" ADD CONSTRAINT "VoucherPromotional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
