/*
  Warnings:

  - Added the required column `invoice_url` to the `charges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charges" ADD COLUMN     "invoice_url" TEXT NOT NULL,
ALTER COLUMN "payed_at" SET DEFAULT NULL,
ALTER COLUMN "updated_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT NULL;
