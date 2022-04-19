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
- app.post("/products");
- app.get("/products");
- app.get("/products/:id");


### Users
- app.post("/users");
- app.post("/users/auth");
- app.get("/users");
- app.get("/users/:id");


### Orders
- app.post("/orders");
- app.get("/orders");
- app.get("/orders/:id");
- app.post("/orders/:id/products");

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











