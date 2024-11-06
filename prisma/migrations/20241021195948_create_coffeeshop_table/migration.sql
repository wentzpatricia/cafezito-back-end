-- CreateTable
CREATE TABLE "CoffeShop" (
    "id_cafeteria" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "coffees" TEXT NOT NULL,
    "rating" TEXT NOT NULL,

    CONSTRAINT "CoffeShop_pkey" PRIMARY KEY ("id_cafeteria")
);
