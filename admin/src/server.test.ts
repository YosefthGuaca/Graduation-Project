import supertest from "supertest";
import app from "./server";

const request = supertest(app);

describe("GET /", () => {
  it('responds with "Hello world!"', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello world!");
  });
});
