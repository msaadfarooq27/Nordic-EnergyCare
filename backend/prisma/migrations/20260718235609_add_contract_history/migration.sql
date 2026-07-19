/*
  Warnings:

  - You are about to drop the column `monthyFee` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "monthyFee",
ADD COLUMN     "monthlyFee" DECIMAL(65,30) NOT NULL DEFAULT 0;
