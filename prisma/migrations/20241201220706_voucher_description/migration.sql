/*
  Warnings:

  - Added the required column `voucherDescription` to the `VoucherPromotional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoucherPromotional" ADD COLUMN     "voucherDescription" TEXT NOT NULL;
