/*
  Warnings:

  - You are about to drop the column `contractType` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `latestBillStatus` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "contractType",
DROP COLUMN "latestBillStatus";
