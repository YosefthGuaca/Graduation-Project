import supertest from "supertest";
import server from "./server";

const request = supertest(server);

describe("GET /", () => {
  it("responds with the index page", async () => {
    const response = await request.get("/");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("text/html");
  });
});

afterAll(() => {
  server.close();
});
