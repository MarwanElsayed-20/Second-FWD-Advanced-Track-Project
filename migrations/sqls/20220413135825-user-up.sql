CREATE TABLE IF NOT EXISTS shop_user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password TEXT NOT NULL
);