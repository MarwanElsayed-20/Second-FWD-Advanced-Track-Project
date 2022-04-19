// import the database connection
import client from "../database";

export type Order = {
  id: number;
  status: string;
  userId: number;
};

export class UserOrder {
  // create the create function
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (status, u_id) VALUES ($1,$2) RETURNING *";
      const result = await conn.query(sql, [o.status, o.userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`can not create the order ${err}`);
    }
  }

  //   create index function
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`cannot show the orders ${err}`);
    }
  }

  // create the show function
  async show(id: number, userId: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1) AND u_id=($2)";
      const result = await conn.query(sql, [id, userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`can not show this user's order ${err}`);
    }
  }

  // create add product to order function
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity, o_id, p_id) VALUES ($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [quantity, orderId, productId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`can not add the product the the order ${err}`);
    }
  }
}
