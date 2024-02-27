import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.admin.createMany({
    data: [
      {
        email: "admin1@example.com",
        password: "admin1",
      },
      {
        email: "admin2@example.com",
        password: "admin2",
      },
      {
        email: "admin3@example.com",
        password: "admin3",
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: "user1",
        username: "user1",
      },
      {
        email: "user2@example.com",
        password: "user2",
        username: "user2",
      },
      {
        email: "user3@example.com",
        password: "user3",
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
