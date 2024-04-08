import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const websiteSlug = "my-first-website";

async function seed() {
  await prisma.admin.createMany({
    data: [
      {
        email: "admin@example.com",
        hashedPassword: await bcrypt.hash("admin", 10),
        type: "Super",
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        hashedPassword: await bcrypt.hash("user1", 10),
        username: "user1",
        type: "General",
      },
      {
        email: "user2@example.com",
        hashedPassword: await bcrypt.hash("user2", 10),
        username: "user2",
        type: "General",
      },
      {
        email: "user3@example.com",
        hashedPassword: await bcrypt.hash("user3", 10),
        username: "user3",
        type: "General",
      },
    ],
  });

  await prisma.website.createMany({
    data: [
      {
        title: "My First Website",
        slug: websiteSlug,
        userId: 1,
      },
    ],
  });

  await prisma.page.createMany({
    data: [
      {
        slug: "index",
        status: "Draft",
        name: "Top",
        websiteId: 1,
      },
      {
        slug: "about",
        status: "Draft",
        name: "About",
        websiteId: 1,
      },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const publicFilePath = path.join(
  __dirname,
  "..",
  "backend",
  "tmp",
  "public",
  websiteSlug
);
fs.mkdirSync(publicFilePath, { recursive: true });
fs.writeFileSync(
  path.join(publicFilePath, "index.html"),
  `<h1>Hello, this is index page.</h1>`
);
fs.writeFileSync(
  path.join(publicFilePath, "about.html"),
  `<h1>Hello, this is about page.</h1>`
);
