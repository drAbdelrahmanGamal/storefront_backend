import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class productStore {
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }

  async update(id: number, p: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET (name, price) = ($2, $3) WHERE id = $1 RETURNING *;';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id, p.name, p.price]);

      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not update the product ${id}. Error: ${err}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products;';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
