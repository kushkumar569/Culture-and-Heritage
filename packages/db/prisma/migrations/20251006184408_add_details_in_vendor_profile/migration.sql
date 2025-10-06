/*
  Warnings:

  - Added the required column `location` to the `VendorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vendorprofile` ADD COLUMN `isOpen` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;
