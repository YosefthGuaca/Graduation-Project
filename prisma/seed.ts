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
        slug: "my-first-website",
        userId: 1,
      },
    ],
  });

  await prisma.version.createMany({
    data: [
      {
        status: "Archived",
        websiteId: 1,
      },
      {
        status: "Published",
        websiteId: 1,
      },
      {
        status: "Draft",
        websiteId: 1,
      },
    ],
  });

  await prisma.page.createMany({
    data: [
      {
        slug: "home",
        content: {
          pages: [
            {
              id: "bf3zirzqf0Bnk6BR",
              frames: [
                {
                  id: "Pnr8T5RwyEqpHbJn",
                  component: {
                    type: "wrapper",
                    stylable: [
                      "background",
                      "background-color",
                      "background-image",
                      "background-repeat",
                      "background-attachment",
                      "background-position",
                      "background-size",
                    ],
                    attributes: {
                      id: "iwaj",
                    },
                    components: [
                      {
                        classes: ["bdg-sect"],
                        tagName: "section",
                        components: [
                          {
                            type: "text",
                            classes: ["heading"],
                            tagName: "h1",
                            components: [
                              {
                                type: "textnode",
                                content: "This is top page",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          assets: [],
          styles: [],
        },
        name: "Home",
        versionId: 1,
      },
      {
        slug: "about",
        content: {
          pages: [
            {
              id: "bf3zirzqf0Bnk6BR",
              frames: [
                {
                  id: "Pnr8T5RwyEqpHbJn",
                  component: {
                    type: "wrapper",
                    stylable: [
                      "background",
                      "background-color",
                      "background-image",
                      "background-repeat",
                      "background-attachment",
                      "background-position",
                      "background-size",
                    ],
                    attributes: {
                      id: "iwaj",
                    },
                    components: [
                      {
                        classes: ["bdg-sect"],
                        tagName: "section",
                        components: [
                          {
                            type: "text",
                            classes: ["heading"],
                            tagName: "h1",
                            components: [
                              {
                                type: "textnode",
                                content: "This is about page",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          assets: [],
          styles: [],
        },
        name: "About",
        versionId: 1,
      },
      {
        slug: "home",
        content: {
          pages: [
            {
              id: "bf3zirzqf0Bnk6BR",
              frames: [
                {
                  id: "Pnr8T5RwyEqpHbJn",
                  component: {
                    type: "wrapper",
                    stylable: [
                      "background",
                      "background-color",
                      "background-image",
                      "background-repeat",
                      "background-attachment",
                      "background-position",
                      "background-size",
                    ],
                    attributes: {
                      id: "iwaj",
                    },
                    components: [
                      {
                        classes: ["bdg-sect"],
                        tagName: "section",
                        components: [
                          {
                            type: "text",
                            classes: ["heading"],
                            tagName: "h1",
                            components: [
                              {
                                type: "textnode",
                                content: "This is top page",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          assets: [],
          styles: [],
        },
        name: "Home",
        versionId: 2,
      },
      {
        slug: "about",
        content: {
          pages: [
            {
              id: "bf3zirzqf0Bnk6BR",
              frames: [
                {
                  id: "Pnr8T5RwyEqpHbJn",
                  component: {
                    type: "wrapper",
                    stylable: [
                      "background",
                      "background-color",
                      "background-image",
                      "background-repeat",
                      "background-attachment",
                      "background-position",
                      "background-size",
                    ],
                    attributes: {
                      id: "iwaj",
                    },
                    components: [
                      {
                        classes: ["bdg-sect"],
                        tagName: "section",
                        components: [
                          {
                            type: "text",
                            classes: ["heading"],
                            tagName: "h1",
                            components: [
                              {
                                type: "textnode",
                                content: "This is about page",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          assets: [],
          styles: [],
        },
        name: "About",
        versionId: 2,
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
