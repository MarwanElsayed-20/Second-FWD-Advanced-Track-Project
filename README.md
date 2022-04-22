# Second-FWD-Advanced-Track-Project

 Build a Storefront Backend
 
## setup the database :-
1. install pg package 
2. create database.ts file and import pool form pg package in it
3. create a new pool with the database information in it

## connect to the database :- 
1. npm > to install all the required packages
2. create .env file and include the envirnoment variables i will provide in it
3. npm run start > to run the server
4. go to postman and test the ENDPOINTS from the requirement.md

## create and run the database :-
- start psql `psql postgres`
- `CREATE USER shop_owner WITH PASSWORD 'password123';`
- `CREATE DATABASE shopping_store;`
- `CREATE DATABASE shopping_store_test;
- `GRANT ALL PRIVILEGES ON DATABASE shopping_store TO shop_owner;`
- `GRANT ALL PRIVILEGES ON DATABASE shopping_store_test TO shop_owner;`

### database and backend Port: http://localhost:3000/

## information required in body to send with POST routes :-
- in /users Post route && in /users/auth Post route :- 
```
{
 "firstName": "a first name",
 "secondName": "a second name",
 "password": "a password"
}
```
- in /products Post route :-
```
{
 "name": "a product name",
 "price": "the product price"
}
```
- in /orders Post route :-
```
{
 "status": "the status of the order [active/closed]",
 "userId": "the user's order id"
}
```
- in /orders/:id/products Post route :-
```
{
 "quantity": "the quantity of the product",
 "orderId": "the order id which the product will be added to it",
 "productId": "the product id that will be added to the order"
}
```
