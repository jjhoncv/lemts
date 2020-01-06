import { createPool, Pool, QueryFunction } from 'mysql'
import { promisify } from 'util';
import { getDatabaseConfig } from '../config'

interface PromisifiedPool extends Omit<Pool, 'query'> {
  query: QueryFunction | Function;
}

var pool: PromisifiedPool;

const connectDatabase = () => {
  if (pool) { return pool }
  pool = createPool(getDatabaseConfig());

  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }

    if (connection) connection.release()

    return
  })

  pool.query = promisify(pool.query)

  return pool;
}


export const sql = connectDatabase();
