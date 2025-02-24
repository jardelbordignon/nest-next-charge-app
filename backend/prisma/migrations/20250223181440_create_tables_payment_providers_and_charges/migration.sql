-- CreateEnum
CREATE TYPE "PaymentProviders" AS ENUM ('ASAAS');

-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('CREDIT_CARD', 'BOLETO', 'PIX');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELED');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT NULL;

-- CreateTable
CREATE TABLE "payment_providers" (
    "id" TEXT NOT NULL,
    "provider" "PaymentProviders" NOT NULL,
    "accountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "payment_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charges" (
    "id" TEXT NOT NULL,
    "payment_provider" "PaymentProviders" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "payment_method" "PaymentMethods" NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3),
    "payed_at" TIMESTAMP(3) DEFAULT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT NULL,
    "created_by_id" TEXT NOT NULL,
    "received_by_id" TEXT NOT NULL,

    CONSTRAINT "charges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_providers" ADD CONSTRAINT "payment_providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_received_by_id_fkey" FOREIGN KEY ("received_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
