# DATABASE SCHEMA

## API ENDPOINTS

### Products
- Index
- Show
- Create [token required]

### Users
- Index [token required]
- Show [token required]
- Create N[token required]

### Orders
- Current Order by user (args: user id)[token required]

## RESTFUL ROUTES

### Products
- app.post("/products"); // to create new product into the database product table
- app.get("/products"); // to get all the products from the database
- app.get("/products/:id"); // to get a specific product from the database


### Users
- app.post("/users"); // to create new user into the database user table
- app.post("/users/auth"); // to send a user data to get the user token
- app.get("/users"); // to get all the users from the database
- app.get("/users/:id"); // to get a specific user from the database


### Orders
- app.post("/orders"); // to create new order into the database orders table 
- app.get("/orders"); // to get all the orders from the database
- app.get("/orders/:id"); // to get a specific order from the database
- app.post("/orders/:id/products"); // to add a product into an order in orders_product table

## TABLES

### shop_user table

| Field  | Type | Special Attributes|
| ------ | ---- | ----------------- |
| id     | SERIAL PRIMARY KEY  | Primary Key  |
| first_name  | VARCHAR(150)  | N/A  |
| last_name  | VARCHAR(150)  | N/A  |
| password  | TEXT NOT NULL | N/A  |

### orders table

| Field  | Type | Special Attributes|
| ------ | ---- | ----------------- |
| id     | SERIAL PRIMARY KEY  | Primary Key  |
| status  | VARCHAR(150)  | N/A  |
| u_id  | INTEGER NOT NULL REFERENCES | Forign Key  |

### products tabls

| Field  | Type | Special Attributes|
| ------ | ---- | ----------------- |
| id     | SERIAL PRIMARY KEY  | Primary Key |
| name  | VARCHAR(150)  | N/A  |
| price  | DECIMAL | N/A  |

### order_products table

| Field  | Type | Special Attributes|
| ------ | ---- | ----------------- |
| id     | SERIAL PRIMARY KEY  | Primary key |
| quantity  | INTEGER  | N/A  |
| o_id  | INTEGER NOT NULL REFERENCES | Forign Key  |
| p_id  | INTEGER NOT NULL REFERENCES | Forign Key  |











