-- AlterTable
ALTER TABLE `Order` ADD COLUMN `couponId` INTEGER NULL,
    ADD COLUMN `discountInCents` INTEGER NULL,
    ADD COLUMN `finalAmountInCents` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `discountType` ENUM('FIXED', 'PERCENTAGE') NOT NULL,
    `discountValue` INTEGER NOT NULL,
    `maxRedemptions` INTEGER NULL,
    `usedRedemptions` INTEGER NOT NULL DEFAULT 0,
    `validFrom` DATETIME(3) NULL,
    `validUntil` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Coupon_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
