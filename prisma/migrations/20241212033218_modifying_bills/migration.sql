/*
  Warnings:

  - You are about to drop the column `totalMonthlyUsage` on the `Bill` table. All the data in the column will be lost.
  - The `status` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `billingMonth` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('UNPAID', 'PAID', 'OVERDUE', 'PARTIALLY_PAID', 'VOIDED');

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "totalMonthlyUsage",
ADD COLUMN     "billingMonth" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BillStatus" NOT NULL DEFAULT 'UNPAID';
