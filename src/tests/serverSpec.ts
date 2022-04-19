import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("test the server", () => {
  it("get the root endpoint /", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
