/*
  Warnings:

  - You are about to drop the column `dateTimeCompleted` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cartId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "dateTimeCompleted",
ADD COLUMN     "dataTimeCompleted" TIMESTAMP(3),
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "statusPayment" DROP DEFAULT;

-- DropTable
DROP TABLE "Order";
