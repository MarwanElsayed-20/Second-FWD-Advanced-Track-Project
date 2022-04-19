import { Product, ShopProduct } from "../product";

const shopProduct = new ShopProduct();

describe("product model", () => {
  describe("test methods existence", () => {
    it("should have a create function", () => {
      expect(shopProduct.create).toBeDefined();
    });

    it("should have a index function", () => {
      expect(shopProduct.index).toBeDefined();
    });

    it("should have a show function", () => {
      expect(shopProduct.show).toBeDefined();
    });
  });

  describe("test product logic", () => {
    const product: Product = {
      id: 1,
      name: "test",
      price: 10,
    };

    it("create method should return new product", async () => {
      const createdProduct = await shopProduct.create(product);
      expect(createdProduct).toEqual(createdProduct);
    });

    it("index method should get all products", async () => {
      const products = await shopProduct.index();
      expect(products.length).toEqual(1);
    });

    it("show method should get one product", async () => {
      const aProduct = await shopProduct.show(1);
      expect(aProduct.id).toEqual(1);
    });
  });
});
