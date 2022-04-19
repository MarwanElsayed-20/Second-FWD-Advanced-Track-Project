import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("test CRUD APIs", () => {
  it("should create new product", async () => {
    const res = await request
      .post("/orders")
      .set("Content-type", "Application/json")
      .send({
        status: "active",
        userId: 1,
      });
    expect(res.status).toBe(200);
  });

  it("should get all products", async () => {
    const res = await request
      .get("/orders")
      .set("Content-type", "Application/json");
    expect(res.status).toBe(200);
  });
});
