// import our database information
import client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export class ShopProduct {
  // create the create function
  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name, price) VALUES ($1,$2) RETURNING *";
      const result = await conn.query(sql, [p.name, p.price]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable To Create A New Product ${err}`);
    }
  }

  // create the index function
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot show the products ${err}`);
    }
  }

  // create the show function
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot show this product ${err}`);
    }
  }
}
