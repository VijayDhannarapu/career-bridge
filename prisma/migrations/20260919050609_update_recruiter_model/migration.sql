/*
  Warnings:

  - You are about to drop the column `officeName` on the `PostJob` table. All the data in the column will be lost.
  - You are about to drop the column `recruitureId` on the `PostJob` table. All the data in the column will be lost.
  - You are about to drop the `Recruiture` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recruiterId` to the `PostJob` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostJob" DROP CONSTRAINT "PostJob_recruitureId_fkey";

-- AlterTable
ALTER TABLE "PostJob" DROP COLUMN "officeName",
DROP COLUMN "recruitureId",
ADD COLUMN     "recruiterId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Recruiture";

-- CreateTable
CREATE TABLE "Recruiter" (
    "recId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "officeName" TEXT NOT NULL,
    "imgUrl" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("recId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_clerkId_key" ON "Recruiter"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_email_key" ON "Recruiter"("email");

-- AddForeignKey
ALTER TABLE "PostJob" ADD CONSTRAINT "PostJob_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("recId") ON DELETE RESTRICT ON UPDATE CASCADE;
