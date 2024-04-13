-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailSentAt" TIMESTAMP(3),
ADD COLUMN     "temporaryPassword" TEXT;
