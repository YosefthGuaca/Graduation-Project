import request from "supertest";
import server from "../index";

describe("CORS Routes", () => {
  it("should return 200 for GET /api/cors-test", async () => {
    const res = await request(server).get("/api/cors-test");
    expect(res.status).toBe(200);
  });

  it("should return 201 for POST /api/cors-test", async () => {
    const res = await request(server).post("/api/cors-test");
    expect(res.status).toBe(201);
  });

  it("should return 200 for DELETE /api/cors-test", async () => {
    const res = await request(server).delete("/api/cors-test");
    expect(res.status).toBe(200);
  });

  it("should return 200 for PATCH /api/cors-test", async () => {
    const res = await request(server).patch("/api/cors-test");
    expect(res.status).toBe(200);
  });

  it("should return 200 for PUT /api/cors-test", async () => {
    const res = await request(server).put("/api/cors-test");
    expect(res.status).toBe(200);
  });
});

afterAll(() => {
  server.close();
});
