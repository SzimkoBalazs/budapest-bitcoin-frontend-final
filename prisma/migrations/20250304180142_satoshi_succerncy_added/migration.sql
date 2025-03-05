-- AlterTable
ALTER TABLE `Order` MODIFY `currency` ENUM('EUR', 'HUF', 'SATS') NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE `Payment` MODIFY `currency` ENUM('EUR', 'HUF', 'SATS') NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE `Ticket` MODIFY `currency` ENUM('EUR', 'HUF', 'SATS') NOT NULL DEFAULT 'EUR';
