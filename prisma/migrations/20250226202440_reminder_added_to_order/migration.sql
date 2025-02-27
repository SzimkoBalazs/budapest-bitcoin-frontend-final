-- AlterTable
ALTER TABLE `Order` ADD COLUMN `reminder24hSent` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reminder6hSent` BOOLEAN NOT NULL DEFAULT false;
