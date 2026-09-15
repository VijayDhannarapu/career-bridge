/*
  Warnings:

  - Added the required column `ctc` to the `PostJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `PostJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeName` to the `PostJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostJob" ADD COLUMN     "ctc" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "jobType" TEXT NOT NULL,
ADD COLUMN     "officeName" TEXT NOT NULL;
