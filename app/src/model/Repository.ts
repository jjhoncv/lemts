import { ConnectionMySql, PromisifiedPool } from "../connection/ConnectionMySql";

export class Repository extends ConnectionMySql {
  public pool: PromisifiedPool;
  constructor() {
    super();
  }
}