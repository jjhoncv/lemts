import { ConnectionMySql, PromisifiedPool } from "../connection/ConnectionMySql";

export class Repository extends ConnectionMySql {
  public pool: PromisifiedPool;
  constructor() {
    super();
  }

  public async queryOne(...args) {
    let rows: any = await this.pool.query.apply(this.pool, args);
    if (rows.length === 1) {
      rows = rows[0];
    }
    return rows;
  }
}