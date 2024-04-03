import request from "supertest";
import server from "../index";
import { seedPage } from "../../../prisma/testData";
import prisma from "../client";

describe("GET websites/:websiteSlug/pages/:pageSlug", () => {
  it("should return a page", async () => {
    const page = await seedPage(prisma, {});
    const response = await request(server).get(`/projects/${page.id}`);
    expect(response.status).toEqual(200);
  });
});

describe("PATCH websites/:websiteSlug/pages/:pageSlug", () => {
  it("should update a page", async () => {
    const page = await seedPage(prisma, {});
    const response = await request(server)
      .patch(`/projects/${page.id}`)
      .send({ content: { page: "content" } });
    expect(response.status).toEqual(200);
  });
});

afterAll(() => {
  server.close();
  prisma.$disconnect();
});
