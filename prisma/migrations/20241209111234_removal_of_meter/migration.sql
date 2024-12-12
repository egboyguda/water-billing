/*
  Warnings:

  - You are about to drop the column `meterId` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the `Meter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Reading` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meter" DROP CONSTRAINT "Meter_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reading" DROP CONSTRAINT "Reading_meterId_fkey";

-- AlterTable
ALTER TABLE "Reading" DROP COLUMN "meterId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Meter";

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
