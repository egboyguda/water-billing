/*
  Warnings:

  - You are about to drop the `WaterUsage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WaterUsage" DROP CONSTRAINT "WaterUsage_userId_fkey";

-- DropTable
DROP TABLE "WaterUsage";

-- CreateTable
CREATE TABLE "ReadingWater" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "waterUsage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingWater_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingWater" ADD CONSTRAINT "ReadingWater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
