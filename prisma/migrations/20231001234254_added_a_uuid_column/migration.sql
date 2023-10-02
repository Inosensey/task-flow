/*
  Warnings:

  - You are about to drop the column `userId` on the `PersonalInformation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PersonalInformation" DROP CONSTRAINT "PersonalInformation_userId_fkey";

-- AlterTable
ALTER TABLE "PersonalInformation" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "PersonalInformation" ADD CONSTRAINT "PersonalInformation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
