// import express
import express, { Request, Response } from "express";
// import user model class and its types
import { ShopProduct } from "../models/product";
// import JWT
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_TOKEN } = process.env;
const secretToken = SECRET_TOKEN;

const product = new ShopProduct();

// creat the create route
const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, secretToken as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token`);
    return;
  }

  try {
    const newProduct = await product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.json(err);
  }
};

// create the index route
const index = async (_req: Request, res: Response) => {
  try {
    const allProducts = await product.index();
    res.json(allProducts);
  } catch (err) {
    res.json(err);
  }
};

// create the show route
const show = async (req: Request, res: Response) => {
  try {
    const specificProduct = await product.show(
      req.params.id as unknown as number
    );
    res.json({ ...specificProduct });
  } catch (err) {
    res.json(err);
  }
};

const product_routes = (app: express.Application) => {
  app.post("/products", create);
  app.get("/products", index);
  app.get("/products/:id", show);
};

export default product_routes;
