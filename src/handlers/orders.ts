// import express
import express, { Request, Response } from "express";
// import order class
import { Order, UserOrder } from "../models/order";
// import JWT
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_TOKEN } = process.env;
const secretToken = SECRET_TOKEN;

const order = new UserOrder();

// create the create route
const create = async (req: Request, res: Response) => {
  try {
    const newOrder = await order.create(req.body);
    res.json(newOrder);
  } catch (err) {
    res.json(err);
  }
};

// create the index route
const index = async (req: Request, res: Response) => {
  try {
    const allOrders = await order.index();
    res.json(allOrders);
  } catch (err) {
    res.json(err);
  }
};

// create the show route
const show = async (req: Request, res: Response) => {
  const o: Order = {
    id: req.params.id as unknown as number,
    status: req.body.status,
    userId: req.body.userId,
  };

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
    const specificOrder = await order.show(o.id, o.userId);
    res.json(specificOrder);
  } catch (err) {
    res.json(err);
  }
};

// create the add products to order route
const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;

  try {
    const addedProducts = await order.addProduct(quantity, orderId, productId);
    res.json(addedProducts);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.post("/orders", create);
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders/:id/products", addProduct);
};

export default orders_routes;
