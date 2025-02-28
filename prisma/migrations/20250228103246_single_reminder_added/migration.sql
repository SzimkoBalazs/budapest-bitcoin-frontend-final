/*
  Warnings:

  - You are about to drop the column `reminder24hSent` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `reminder6hSent` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `reminder24hSent`,
    DROP COLUMN `reminder6hSent`,
    ADD COLUMN `reminderSent` BOOLEAN NOT NULL DEFAULT false;
