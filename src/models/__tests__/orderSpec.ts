import { Order, UserOrder } from "../order";

const userOrder = new UserOrder();

describe("order model", () => {
  describe("test methods existence", () => {
    it("should have a create function", () => {
      expect(userOrder.create).toBeDefined();
    });

    it("should have a index function", () => {
      expect(userOrder.index).toBeDefined();
    });

    it("should have a show function", () => {
      expect(userOrder.show).toBeDefined();
    });
  });
});
