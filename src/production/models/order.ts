import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

export type Order_Products = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class orderStore {
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.user_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  async update(id: number, status: string): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET status = $2 WHERE id = $1 RETURNING *;';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id, status]);

      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not update the order ${id}. Error: ${err}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders;';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = [
        'DELETE FROM order_products WHERE order_id=($1);',
        'DELETE FROM orders WHERE id=($1);',
      ];
      const conn = await Client.connect();
      await conn.query(sql[0], [id]);
      const result = await conn.query(sql[1], [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order_Products> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];

      if (order.status !== 'open') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
