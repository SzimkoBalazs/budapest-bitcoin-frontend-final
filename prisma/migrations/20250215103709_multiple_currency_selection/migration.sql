/*
  Warnings:

  - You are about to alter the column `currency` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to alter the column `currency` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to drop the column `price` on the `Ticket` table. All the data in the column will be lost.
  - You are about to alter the column `currency` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `currency` ENUM('EUR', 'HUF') NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE `Payment` MODIFY `currency` ENUM('EUR', 'HUF') NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `price`,
    ADD COLUMN `priceInEur` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `priceInHuf` INTEGER NOT NULL DEFAULT 10,
    MODIFY `currency` ENUM('EUR', 'HUF') NOT NULL DEFAULT 'EUR';
