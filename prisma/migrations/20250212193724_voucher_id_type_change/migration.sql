/*
  Warnings:

  - The primary key for the `Voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Voucher` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);
