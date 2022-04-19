import supertest from "supertest";
import app from "../../server";
import client from "../../database";
import { User, ShopUser } from "../../models/user";

const shopUser = new ShopUser();
const request = supertest(app);
let token = "";

describe("test user API EndPoints", () => {
  const user = {
    firstName: "test",
    lastName: "user",
    password: "test123",
  } as User;

  beforeAll(async () => {
    const createdUser = await shopUser.create(user);
    user.id = createdUser.id;
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = "DELETE FROM shop_user;";
    await conn.query(sql);
    conn.release();
  });

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

    it("should be failed with wrong first name", async () => {
      const res = await request
        .post("/users/auth")
        .set("Content-type", "Application/json")
        .send({
          firstName: "wrong",
          lastName: "user",
          password: "test123",
        });
      expect(res.status).toBe(200);
    });
  });

  describe("test CRUD RESTful API", () => {
    it("should create new user", async () => {
      const res = await request
        .post("/users")
        .set("Content-type", "Application/json")
        .send({
          firsName: "test2",
          lastName: "user2",
          password: "test2123",
        });
      expect(res.status).toBe(200);
    });

    it("should get all users", async () => {
      const res = await request
        .get("/users")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("should get specific user", async () => {
      const res = await request
        .get(`/users/${user.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
