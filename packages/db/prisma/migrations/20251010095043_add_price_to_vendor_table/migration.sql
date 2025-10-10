/*
  Warnings:

  - Added the required column `place` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `place` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL;
