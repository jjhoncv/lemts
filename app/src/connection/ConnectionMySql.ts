import { createPool, Pool, QueryFunction } from "mysql";
import { promisify } from "util";
import { database } from "../config/database";

interface PromisifiedPool extends Omit<Pool, "query"> {
  query: QueryFunction | Function;
}

var pool: PromisifiedPool;

const ConnectionMySql = () => {
  if (pool) {
    return pool;
  }
  pool = createPool({
    host: database.host,
    user: database.username,
    password: database.password,
    database: database.database
  });

  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
      }
    }

    if (connection) connection.release();

    return;
  });

  pool.query = promisify(pool.query);

  return pool;
};


export const connectionMySql = ConnectionMySql();
