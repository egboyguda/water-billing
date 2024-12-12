/*
  Warnings:

  - You are about to drop the column `wateUsage` on the `WaterUsage` table. All the data in the column will be lost.
  - Added the required column `waterUsage` to the `WaterUsage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WaterUsage" DROP COLUMN "wateUsage",
ADD COLUMN     "waterUsage" DOUBLE PRECISION NOT NULL;
