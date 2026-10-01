/*
  Warnings:

  - Made the column `isVisible` on table `PostJob` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PostJob" ALTER COLUMN "isVisible" SET NOT NULL;
