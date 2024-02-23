import supertest from "supertest";
import server from "./server";

const request = supertest(server);

describe("GET /", () => {
  it('responds with "Hello world!"', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello world!");
  });
});

afterAll(() => {
  server.close();
});
