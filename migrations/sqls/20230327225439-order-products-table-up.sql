   CREATE TABLE IF NOT EXISTS order_products (
          id SERIAL PRIMARY KEY,
          quantity INTEGER,
          order_id bigint REFERENCES orders (id),
          product_id bigint REFERENCES products (id)
          );