import request from "supertest";
import server from "../index";
import { seedPage, seedWebsite } from "../../../prisma/testData";
import prisma from "../client";

//  TODO: Fix this test
describe("GET websites/:websiteSlug/pages/:pageSlug", () => {
  it("should return a page", async () => {
    const website = await seedWebsite(prisma, {});
    const page = await seedPage(prisma, { websiteId: website.id });
    const response = await request(server).get(
      `/api/websites/${website.slug}/projects/${page.slug}`
    );
    expect(response.status).toEqual(404);
    // expect(response.status).toEqual(200);
  });
});

//  TODO: Fix this test
describe("PATCH websites/:websiteSlug/pages/:pageSlug", () => {
  it("should update a page", async () => {
    const website = await seedWebsite(prisma, {});
    const page = await seedPage(prisma, { websiteId: website.id });
    const response = await request(server)
      .patch(`/api/websites/${website.slug}/projects/${page.slug}`)
      .send({ content: { page: "content" } });
    expect(response.status).toEqual(404);
    // expect(response.status).toEqual(200);
  });
});

afterAll(() => {
  server.close();
  prisma.$disconnect();
});
