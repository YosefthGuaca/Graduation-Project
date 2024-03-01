import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

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
      },
      {
        email: "user2@example.com",
        hashedPassword: await bcrypt.hash("user2", 10),
        username: "user2",
      },
      {
        email: "user3@example.com",
        hashedPassword: await bcrypt.hash("user3", 10),
        username: "user3",
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
