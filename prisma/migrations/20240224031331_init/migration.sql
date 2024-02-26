-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'Manager', 'Member');

-- CreateEnum
CREATE TYPE "Template" AS ENUM ('Default');

-- CreateEnum
CREATE TYPE "PageStatus" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateEnum
CREATE TYPE "BlockStatus" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateEnum
CREATE TYPE "FontRole" AS ENUM ('HeroTitle', 'HeroSubtitle', 'ThumnailTitle', 'HeadingFirst', 'HeadingSecond', 'HeadingThird', 'HeadingFourth', 'HeroParagraph', 'ThumnailDescription', 'Paragraph', 'ImageCaption', 'NavigationLinks', 'ButtonLabel');

-- CreateEnum
CREATE TYPE "FontSize" AS ENUM ('XSmall', 'Small', 'Base', 'Large', 'XLarge', 'TwoXLarge', 'ThreeXLarge', 'FourXLarge', 'FiveXLarge', 'SixXLarge', 'SevenXLarge', 'EightXLarge', 'NineXLarge');

-- CreateEnum
CREATE TYPE "FontWeight" AS ENUM ('Thin', 'ExtraLight', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black');

-- CreateEnum
CREATE TYPE "LineHeight" AS ENUM ('Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Tight', 'Snug', 'Normal', 'Relaxed', 'Loose');

-- CreateEnum
CREATE TYPE "ColorRole" AS ENUM ('HeroTitle', 'HeroSubtitle', 'HeadingFirst', 'HeadingSecond', 'HeadingThird', 'HeadingFourth', 'ThumnailTitle', 'HeroParagraph', 'ThumnailSubtitle', 'Paragraph', 'ImageCaption', 'NavigationItemsDefault', 'NavigationItemsHover', 'ButtonFill', 'ButtonText', 'Hyperlinks', 'Background', 'DividerLines');

-- CreateEnum
CREATE TYPE "ColorBase" AS ENUM ('Inherit', 'Current', 'Transparent', 'Black', 'White', 'Slate', 'Gray', 'Zinc', 'Neutral', 'Stone', 'Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green', 'Emerald', 'Teal', 'Cyan', 'Sky', 'Blue', 'Indigo', 'Violet', 'Purple', 'Fuchsia', 'Pink', 'Rose');

-- CreateEnum
CREATE TYPE "ColorShade" AS ENUM ('S50', 'S100', 'S200', 'S300', 'S400', 'S500', 'S600', 'S700', 'S800', 'S900', 'S950');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "provider" TEXT,
    "providerId" TEXT,
    "providerData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'Member',
    "provider" TEXT,
    "providerId" TEXT,
    "providerData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medium" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Medium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "template" "Template" NOT NULL DEFAULT 'Default',
    "status" "PageStatus" NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "websiteId" INTEGER NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "status" "BlockStatus" NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Font" (
    "id" SERIAL NOT NULL,
    "role" "FontRole" NOT NULL,
    "size" "FontSize" NOT NULL,
    "weight" "FontWeight" NOT NULL DEFAULT 'Regular',
    "italic" BOOLEAN NOT NULL DEFAULT false,
    "lineHeight" "LineHeight" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "websiteId" INTEGER NOT NULL,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "role" "ColorRole" NOT NULL,
    "base" "ColorBase" NOT NULL,
    "shade" "ColorShade" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "websiteId" INTEGER NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medium_filename_key" ON "Medium"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Website_slug_key" ON "Website"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_websiteId_key" ON "Page"("slug", "websiteId");

-- AddForeignKey
ALTER TABLE "Medium" ADD CONSTRAINT "Medium_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Font" ADD CONSTRAINT "Font_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
