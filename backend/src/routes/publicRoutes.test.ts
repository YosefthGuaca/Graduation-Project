import request from "supertest";
import server from "../index";
import fs from "fs";
import path from "path";

const filePath = path.join(
  __dirname,
  "..",
  "..",
  "tmp",
  "public",
  "website-slug"
);

describe("GET /u/:websiteSlug", () => {
  it("should return 200 OK", async () => {
    fs.mkdirSync(filePath, { recursive: true });
    fs.writeFileSync(
      path.join(filePath, "index.html"),
      `<h1>Hello, this is index page.</h1>`
    );
    const res = await request(server).get("/u/website-slug");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello, this is index page.");
    fs.unlinkSync(path.join(filePath, "index.html"));
    fs.rmSync(filePath, { recursive: true });
  });
  it("should return 404", async () => {
    const res = await request(server).get("/u/website-slug");
    expect(res.status).toBe(404);
  });
});

describe("GET /u/:websiteSlug/p/:pageSlug", () => {
  it("should return 200 OK", async () => {
    fs.mkdirSync(filePath, { recursive: true });
    fs.writeFileSync(
      path.join(filePath, "about.html"),
      `<h1>Hello, this is about page.</h1>`
    );
    const res = await request(server).get("/u/website-slug/p/about");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello, this is about page.");
    fs.unlinkSync(path.join(filePath, "about.html"));
    fs.rmSync(filePath, { recursive: true });
  });
  it("should return 404", async () => {
    const res = await request(server).get("/u/website-slug/p/about");
    expect(res.status).toBe(404);
  });
});

afterAll(() => {
  server.close();
});
