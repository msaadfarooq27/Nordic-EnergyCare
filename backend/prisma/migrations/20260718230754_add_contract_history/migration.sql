-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('FIXED', 'SPOT', 'VARIABLE');

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "retailerName" TEXT NOT NULL,
    "contractType" "ContractType" NOT NULL,
    "pricePerKwh" DECIMAL(65,30) NOT NULL,
    "monthyFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
