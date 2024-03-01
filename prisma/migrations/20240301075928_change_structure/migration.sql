/*
  Warnings:

  - The values [Manager,Member] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `providerData` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `websiteId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Font` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug,versionId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileFilename]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[faviconFilename]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('Super', 'Editor', 'Reader');

-- CreateEnum
CREATE TYPE "VersionStatus" AS ENUM ('Draft', 'Published', 'Archived');

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('Admin', 'General');
ALTER TABLE "User" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "type" TYPE "UserType_new" USING ("type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "User" ALTER COLUMN "type" SET DEFAULT 'General';
COMMIT;

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "Font" DROP CONSTRAINT "Font_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "Medium" DROP CONSTRAINT "Medium_userId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_projectId_fkey";

-- DropIndex
DROP INDEX "Page_slug_websiteId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password",
DROP COLUMN "provider",
DROP COLUMN "providerData",
DROP COLUMN "providerId",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "type" "AdminType" NOT NULL DEFAULT 'Reader';

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "websiteId",
ADD COLUMN     "content" JSONB,
ADD COLUMN     "versionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "PremiumEnd" TIMESTAMP(3),
ADD COLUMN     "PremiumStart" TIMESTAMP(3),
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "profileFilename" TEXT,
ADD COLUMN     "profileMimetype" TEXT,
ADD COLUMN     "profilePath" TEXT,
ADD COLUMN     "profileSize" INTEGER,
ALTER COLUMN "type" SET DEFAULT 'General';

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "projectId",
DROP COLUMN "status",
DROP COLUMN "template",
ADD COLUMN     "faviconFilename" TEXT,
ADD COLUMN     "faviconMimetype" TEXT,
ADD COLUMN     "faviconPath" TEXT,
ADD COLUMN     "faviconSize" INTEGER,
ADD COLUMN     "googleAnalyticsId" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "ogDescription" TEXT,
ADD COLUMN     "ogImageFilename" TEXT,
ADD COLUMN     "ogImageMimetype" TEXT,
ADD COLUMN     "ogImagePath" TEXT,
ADD COLUMN     "ogImageSize" INTEGER,
ADD COLUMN     "ogTitle" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Block";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Font";

-- DropTable
DROP TABLE "Medium";

-- DropTable
DROP TABLE "Project";

-- DropEnum
DROP TYPE "BlockStatus";

-- DropEnum
DROP TYPE "ColorBase";

-- DropEnum
DROP TYPE "ColorRole";

-- DropEnum
DROP TYPE "ColorShade";

-- DropEnum
DROP TYPE "FontRole";

-- DropEnum
DROP TYPE "FontSize";

-- DropEnum
DROP TYPE "FontWeight";

-- DropEnum
DROP TYPE "LineHeight";

-- DropEnum
DROP TYPE "PageStatus";

-- DropEnum
DROP TYPE "Template";

-- CreateTable
CREATE TABLE "UserLoginLog" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLoginLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" SERIAL NOT NULL,
    "status" "VersionStatus" NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "websiteId" INTEGER NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomDomain" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CustomDomain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_filename_key" ON "Asset"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "CustomDomain_domain_key" ON "CustomDomain"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_versionId_key" ON "Page"("slug", "versionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileFilename_key" ON "User"("profileFilename");

-- CreateIndex
CREATE UNIQUE INDEX "Website_faviconFilename_key" ON "Website"("faviconFilename");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomDomain" ADD CONSTRAINT "CustomDomain_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomDomain" ADD CONSTRAINT "CustomDomain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
