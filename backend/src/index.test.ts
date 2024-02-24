import request from "supertest";
import server from "./index";

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("Hello World!");
  });
});

afterAll(() => {
  server.close();
});
