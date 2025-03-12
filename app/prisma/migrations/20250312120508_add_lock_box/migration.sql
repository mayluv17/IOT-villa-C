/*
  Warnings:

  - You are about to drop the column `createdAt` on the `LockBox` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `LockBox` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LockBox" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "LockBox_id_seq";
