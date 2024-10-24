/*
  Warnings:

  - You are about to drop the `CoffeShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CoffeTypes" AS ENUM ('ESPECIAIS', 'TRADICIONAIS', 'CHAS');

-- CreateEnum
CREATE TYPE "Cost" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "ProductTag" AS ENUM ('VEGANO', 'VEGETARIANO', 'PETFRIENDLY', 'COWORKING', 'WIFI', 'SEM_GLUTEN', 'MENOR_PRECO', 'MAIOR_PRECO');

-- DropTable
DROP TABLE "CoffeShop";

-- CreateTable
CREATE TABLE "CoffeeShop" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cost" "Cost" NOT NULL,
    "urlImage" TEXT NOT NULL,
    "product" "ProductTag"[],

    CONSTRAINT "CoffeeShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "feedback" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "coffeeShopId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherPromotional" (
    "id" TEXT NOT NULL,
    "fidelidade" INTEGER NOT NULL,
    "voucher" TEXT,
    "redeemed" BOOLEAN NOT NULL,
    "coffeeShopId" TEXT NOT NULL,

    CONSTRAINT "VoucherPromotional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "coffeTypes" "CoffeTypes"[],
    "urlImages" TEXT[],
    "coffeeShopId" TEXT NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "coffeeShopId" TEXT NOT NULL,
    "environmentId" TEXT,

    CONSTRAINT "SocialMedias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherPromotional" ADD CONSTRAINT "VoucherPromotional_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedias" ADD CONSTRAINT "SocialMedias_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedias" ADD CONSTRAINT "SocialMedias_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
