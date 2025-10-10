/*
  Warnings:

  - You are about to drop the column `vendorId` on the `product` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_vendorId_fkey`;

-- DropIndex
DROP INDEX `Product_vendorId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `vendorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
