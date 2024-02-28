import request from "supertest";
import app from "../index";

describe("CORS Routes", () => {
  it("should return 200 for GET /app/:path*", async () => {
    const res = await request(app).get("/app/:path*");
    expect(res.status).toBe(200);
  });

  it("should return 201 for POST /app/:path*", async () => {
    const res = await request(app).post("/app/:path*");
    expect(res.status).toBe(201);
  });

  it("should return 200 for DELETE /app/:path*", async () => {
    const res = await request(app).delete("/app/:path*");
    expect(res.status).toBe(200);
  });

  it("should return 200 for PATCH /app/:path*", async () => {
    const res = await request(app).patch("/app/:path*");
    expect(res.status).toBe(200);
  });

  it("should return 200 for PUT /app/:path*", async () => {
    const res = await request(app).put("/app/:path*");
    expect(res.status).toBe(200);
  });
});
