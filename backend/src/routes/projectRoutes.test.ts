import request from "supertest";
import server from "../index";
import { MockContext, createMockContext } from "../test/jestContext";

import { Page } from "@prisma/client";
// import { Page, User, Version, Website } from "@prisma/client";

// const testUserId = 1;
// const testEncryptedPassword = "testEncryptedPassword";
// const testUser: User = {
//   id: testUserId,
//   email: "testUser@example.com",
//   username: "testUser",
//   hashedPassword: testEncryptedPassword,
//   type: "General",
//   premiumStart: new Date(),
//   premiumEnd: new Date(),
//   provider: "provider",
//   providerId: "providerId",
//   providerData: { data: "data" },
//   profileFilename: "profileFilename",
//   profilePath: "profilePath",
//   profileMimetype: "profileMimetype",
//   profileSize: 100,
//   class: "class",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// const testWebsiteId = 1;
// const testWebsite: Website = {
//   id: testWebsiteId,
//   title: "testWebsite",
//   slug: "test-website",
//   faviconFilename: "faviconFilename",
//   faviconPath: "faviconPath",
//   faviconMimetype: "faviconMimetype",
//   faviconSize: 100,
//   googleAnalytics_id: "googleAnalytics_id",
//   metaDescription: "metaDescription",
//   ogTitle: "ogTitle",
//   ogDescription: "ogDescription",
//   ogImageFilename: "ogImageFilename",
//   ogImagePath: "ogImagePath",
//   ogImageMimetype: "ogImageMimetype",
//   ogImageSize: 100,
//   password: "password",
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   userId: testUserId,
// };

const testVersionId = 1;
// const testVersion: Version = {
//   id: testVersionId,
//   status: "Draft",
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   websiteId: testWebsiteId,
// };

const testPageId = 1;
const testPage: Page = {
  id: testPageId,
  slug: "testPage",
  content: { page: "content" },
  name: "testPage",
  createdAt: new Date(),
  updatedAt: new Date(),
  versionId: testVersionId,
};

describe("/projects", () => {
  let mockCtx: MockContext;
  beforeEach(() => {
    mockCtx = createMockContext();
  });

  describe("GET /", () => {
    it("should return a page", async () => {
      mockCtx.prisma.page.findUnique.mockResolvedValue(testPage);

      const response = await request(server).get(`/projects/${testPageId}`);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({});
    });
  });

  describe("PATCH /:id", () => {
    it("should update a page", async () => {
      const page = Object.create(testPage);
      page.name = "updatedTestPage";
      mockCtx.prisma.page.update.mockResolvedValue(page);

      const response = await request(server)
        .patch(`/projects/${testPageId}`)
        .send({ content: { page: "content" } });

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({});
    });
  });

  afterAll((done) => {
    server.close(done);
  });
});
