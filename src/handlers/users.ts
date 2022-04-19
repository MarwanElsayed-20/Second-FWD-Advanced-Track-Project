// import express
import express, { Request, Response } from "express";
// import user model class and its types
import { ShopUser } from "../models/user";
// import JWT
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_TOKEN } = process.env;
const secretToken = SECRET_TOKEN;

// put out class in new obj
const user = new ShopUser();

// create the create route
const create = async (req: Request, res: Response) => {
  try {
    const newUser = await user.create(req.body);
    res.json({ ...newUser });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// create the index route
const index = async (req: Request, res: Response) => {
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
    const users = await user.index();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

// create show route
const show = async (req: Request, res: Response) => {
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
    const specificUser = await user.show(req.params.id as unknown as number);
    res.json({ ...specificUser });
  } catch (err) {
    res.json(err);
  }
};

// create authentication route
const authenticate = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;
    const validUser = await user.authenticate(firstName, lastName, password);
    const token = jwt.sign({ validUser }, secretToken as string);
    if (!validUser) {
      return res.json("Not Valid User");
    }
    return res.json(token);
  } catch (err) {
    res.json(err);
  }
};

const users_routes = (app: express.Application) => {
  app.post("/users", create);
  app.post("/users/auth", authenticate);
  app.get("/users", index);
  app.get("/users/:id", show);
};

export default users_routes;
