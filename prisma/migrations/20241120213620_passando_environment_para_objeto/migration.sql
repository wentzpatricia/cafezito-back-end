/*
  Warnings:

  - A unique constraint covering the columns `[coffeeShopId]` on the table `Environment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Environment_coffeeShopId_key" ON "Environment"("coffeeShopId");
