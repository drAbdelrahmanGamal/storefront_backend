import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

dotenv.config();

const { ENV, PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, PGDATABASE_TEST } =
  process.env;

var config: PoolConfig = {
  host: PGHOST,
  port: PGPORT as unknown as number,
  user: PGUSER,
  password: PGPASSWORD,
  database: ENV?.trim() === 'test' ? PGDATABASE_TEST : PGDATABASE,
};

var client = new Pool(config);

export default client;
