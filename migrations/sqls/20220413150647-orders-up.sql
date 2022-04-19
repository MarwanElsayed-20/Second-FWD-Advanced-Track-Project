CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    status VARCHAR(50),
    u_id INTEGER NOT NULL REFERENCES shop_user(id)
);