import {
  PrismaClient,
  Admin,
  User,
  Website,
  UserLoginLog,
  Asset,
  Page,
  Template,
  CustomDomain,
} from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

async function seedAdmin(prisma: PrismaClient, props: Partial<Admin>) {
  const admin = await prisma.admin.create({
    data: {
      email: props.email || faker.internet.email(),
      hashedPassword: props.hashedPassword || (await bcrypt.hash("admin", 10)),
      type: props.type || "Super",
    },
  });

  return admin;
}

async function seedUser(prisma: PrismaClient, props: Partial<User>) {
  const user = await prisma.user.create({
    data: {
      email: props.email || faker.internet.email(),
      username: props.username || "user1",
      class: props.class || "0623-M",
      hashedPassword: props.hashedPassword || (await bcrypt.hash("user1", 10)),
      type: props.type || "General",
      premiumStart: props.premiumStart || new Date(),
      premiumEnd: props.premiumEnd || new Date(),
      provider: props.provider,
      providerId: props.providerId,
      providerData: props.providerData || {},
      profileFilename: props.profileFilename || "main.jpg",
      profilePath: props.profilePath || "/tmp/img/main.jpg",
      profileMimetype: props.profileMimetype || "image/jpeg",
      profileSize: props.profileSize || 1024,
    },
  });

  return user;
}

async function seedUserLoginLog(
  prisma: PrismaClient,
  props: Partial<UserLoginLog>
) {
  let userId = props.userId;
  if (!userId) {
    const user = await seedUser(prisma, {});
    userId = user.id;
  }

  const userLoginLog = await prisma.userLoginLog.create({
    data: {
      ipAddress: props.ipAddress || "192.124.249.183",
      userAgent:
        props.userAgent ||
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      userId,
    },
  });

  return userLoginLog;
}

async function seedAsset(prisma: PrismaClient, props: Partial<Asset>) {
  let userId = props.userId;
  if (!userId) {
    const user = await seedUser(prisma, {});
    userId = user.id;
  }

  const asset = await prisma.asset.create({
    data: {
      filename: props.filename || "main.jpg",
      path: props.path || "/tmp/img/main.jpg",
      mimetype: props.mimetype || "image/jpeg",
      size: props.size || 1024,
      userId,
    },
  });

  return asset;
}

async function seedWebsite(prisma: PrismaClient, props: Partial<Website>) {
  let userId = props.userId;
  if (!userId) {
    const user = await seedUser(prisma, {});
    userId = user.id;
  }

  const website = await prisma.website.create({
    data: {
      title: props.title || "My Title",
      slug: props.slug || faker.lorem.slug(),
      faviconFilename: props.faviconFilename || "favicon.ico",
      faviconPath: props.faviconPath || "/tmp/img/favicon.ico",
      faviconMimetype: props.faviconMimetype || "image/x-icon",
      faviconSize: props.faviconSize || 1024,
      googleAnalytics_id: props.googleAnalytics_id || "UA-123456789-0",
      metaDescription: props.metaDescription || "My meta description",
      ogTitle: props.ogTitle || "My OG Title",
      ogDescription: props.ogDescription || "My OG Description",
      ogImageFilename: props.ogImageFilename || "og-image.jpg",
      ogImagePath: props.ogImagePath || "/tmp/img/og-image.jpg",
      ogImageMimetype: props.ogImageMimetype || "image/jpeg",
      ogImageSize: props.ogImageSize || 1024,
      password: props.password || "password",
      userId,
    },
  });

  return website;
}

async function seedPage(prisma: PrismaClient, props: Partial<Page>) {
  let websiteId = props.websiteId;
  if (!websiteId) {
    const website = await seedWebsite(prisma, {});
    websiteId = website.id;
  }

  const page = await prisma.page.create({
    data: {
      slug: props.slug || "index",
      content: props.content || {
        components: [{ tagName: "h1", content: "Hello, this is Top page!" }],
      },
      name: props.name || "Top",
      websiteId,
    },
  });

  return page;
}

async function seedTemplage(prisma: PrismaClient, props: Partial<Template>) {
  const template = await prisma.template.create({
    data: {
      name: props.name || "My Template",
      path: props.path || "/tmp/template/index.html",
      order: props.order || 1,
    },
  });

  return template;
}

async function seedCustomDomain(
  prisma: PrismaClient,
  props: Partial<CustomDomain>
) {
  let userId = props.userId;
  if (!userId) {
    const user = await seedUser(prisma, {});
    userId = user.id;
  }
  let websiteId = props.websiteId;
  if (!websiteId) {
    const website = await seedWebsite(prisma, {});
    websiteId = website.id;
  }
  const customDomain = await prisma.customDomain.create({
    data: {
      domain: props.domain || faker.internet.domainName(),
      requestedAt: props.requestedAt || new Date(),
      completedAt: props.completedAt,
      websiteId,
      userId,
    },
  });

  return customDomain;
}

export {
  seedAdmin,
  seedUser,
  seedUserLoginLog,
  seedAsset,
  seedWebsite,
  seedPage,
  seedTemplage,
  seedCustomDomain,
};
