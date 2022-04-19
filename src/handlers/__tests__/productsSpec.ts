import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
let token = "";

describe("test authentication API", () => {
  it("should be able to return token", async () => {
    const res = await request
      .post("/users/auth")
      .set("Content-type", "Application/json")
      .send({
        firstName: "test",
        lastName: "user",
        password: "test123",
      });
    expect(res.status).toBe(200);
    token = res.body;
  });
});

describe("test CRUD APIs", () => {
  it("should create new product", async () => {
    const res = await request
      .post("/products")
      .set("Content-type", "Application/json")
      .set("Authorization", `bearer ${token}`)
      .send({
        name: "test",
        price: 10,
      });
    expect(res.status).toBe(401);
  });

  it("should get all products", async () => {
    const res = await request
      .get("/products")
      .set("Content-type", "Application/json");
    expect(res.status).toBe(200);
  });

  it("should get all products", async () => {
    const res = await request
      .get(`/products/1`)
      .set("Content-type", "Application/json");
    expect(res.status).toBe(200);
  });
});
