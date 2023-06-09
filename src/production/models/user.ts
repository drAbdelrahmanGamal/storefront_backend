import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string,
  saltRounds = process.env.SALT_ROUNDS as string;

export class userStore {
  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *;';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT * FROM users WHERE username=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user. Error: ${err}`);
    }
  }

  async update(
    id: number,
    u: {
      first_name: string;
      last_name: string;
    }
  ): Promise<User> {
    try {
      const sql =
        'UPDATE users SET (first_name, last_name) = ($2, $3) WHERE id = $1 RETURNING *;';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id, u.first_name, u.last_name]);

      const user = result.rows[0];
      conn.release();
      console.log(user);

      return user;
    } catch (err) {
      throw new Error(`Could not update the user ${id}. Error: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users;';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
