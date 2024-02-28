import request from "supertest";
import app from "../index";

describe("CORS Routes", () => {
  it("should return 200 for GET /api/cors-test", async () => {
    const res = await request(app).get("/api/cors-test");
    expect(res.status).toBe(200);
  });

  it("should return 201 for POST /api/cors-test", async () => {
    const res = await request(app).post("/api/cors-test");
    expect(res.status).toBe(201);
  });

  it("should return 200 for DELETE /api/cors-test", async () => {
    const res = await request(app).delete("/api/cors-test");
    expect(res.status).toBe(200);
  });

  it("should return 200 for PATCH /api/cors-test", async () => {
    const res = await request(app).patch("/api/cors-test");
    expect(res.status).toBe(200);
  });

  it("should return 200 for PUT /api/cors-test", async () => {
    const res = await request(app).put("/api/cors-test");
    expect(res.status).toBe(200);
  });
});

afterAll(() => {
  app.close();
});
