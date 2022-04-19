import { User, ShopUser } from "../user";
import client from "../../database";

const shopUser = new ShopUser();

describe("user models", () => {
  describe("test methods existence ", () => {
    it("should have a create function", () => {
      expect(shopUser.create).toBeDefined();
    });

    it("should have a index function", () => {
      expect(shopUser.index).toBeDefined();
    });

    it("should have a show function", () => {
      expect(shopUser.show).toBeDefined();
    });

    it("should have a authenticate function", () => {
      expect(shopUser.authenticate).toBeDefined();
    });

    describe("test user model logic", () => {
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
        const sql = "DELETE FROM shop_user";
        await conn.query(sql);
        conn.release();
      });

      it("create method should return a new user", async () => {
        const createdUser = await shopUser.create({
          firstName: "test2",
          lastName: "user2",
          password: "test2123",
        } as User);
        expect(createdUser).toEqual(createdUser);
      });

      it("index method should return all created users", async () => {
        const users = await shopUser.index();
        expect(users.length).toBe(2);
      });
    });
  });
});
