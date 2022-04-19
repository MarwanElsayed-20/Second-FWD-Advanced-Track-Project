// import express to make our server
import express, { Request, Response } from "express";
// import bodyParser middleware
import bodyParser from "body-parser";
// import handlers
import users_routes from "./handlers/users";
import product_routes from "./handlers/products";
import orders_routes from "./handlers/orders";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to the new server");
});

// call our handler function and pass the server in it
users_routes(app);
product_routes(app);
orders_routes(app);

app.listen(port, () => {
  console.log(`server is running at: localHost ${port}`);
});

export default app;
