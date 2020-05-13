import { createPool, Pool, QueryFunction } from "mysql";
import { promisify } from "util";
import { database } from "../config/database";

export interface PromisifiedPool extends Omit<Pool, "query"> {
  query: QueryFunction | Function;
}

export class ConnectionMySql {
  public pool: PromisifiedPool;

  constructor() {
    this.pool = createPool({
      host: database.host,
      user: database.username,
      password: database.password,
      database: database.database,
    });

    this.pool.query = promisify(this.pool.query);
  }
}