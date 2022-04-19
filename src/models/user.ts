// import our database information
import client from "../database";
// import bcrypt
import bcrypt from "bcrypt";
// import dotenv to use environment variables
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const salt = SALT_ROUNDS;

// create the user column types as we work with TS
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  //  using any type because the password can be anything
  password: any;
};

// create the class that will hold our CRUD functionality
export class ShopUser {
  // create the create function to create a user
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO shop_user (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(salt as string)
      );
      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to Create A New User ${err}`);
    }
  }

  // create the index function to show all the users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM shop_user";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Can Not Get The Users ${err} `);
    }
  }

  // create the show function to show specific user
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM shop_user WHERE id=($1)";
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't Find The User With ID: ${id}, ${err}`);
    }
  }

  // create the authentication function
  async authenticate(
    firstName: string,
    lastName: string,
    password: any
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT password FROM shop_user WHERE first_name=($1) AND last_name=($2)";
      const result = await conn.query(sql, [firstName, lastName]);

      if (result.rows.length) {
        const theUser = result.rows[0];

        if (bcrypt.compareSync(password + pepper, theUser.password)) {
          return theUser;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Un Valid User ${err}`);
    }
  }
}
