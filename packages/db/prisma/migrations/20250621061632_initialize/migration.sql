/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `isGuide` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isTourist` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isVendor` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isVlogger` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `VloggerProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bio` VARCHAR(191) NULL,
    `channelUrl` VARCHAR(191) NULL,
    `subscribers` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `VloggerProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VloggerProfile` ADD CONSTRAINT `VloggerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
