CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    o_id INTEGER REFERENCES orders(id),
    p_id INTEGER REFERENCES products(id)
);