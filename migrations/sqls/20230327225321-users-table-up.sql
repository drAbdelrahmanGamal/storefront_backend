   CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          username VARCHAR(255),
          password VARCHAR(255)
          );