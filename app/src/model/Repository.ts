import { connectionMySql } from "../connection/ConnectionMySql";
import { QueryFunction } from "mysql";

export class Repository {
  public query: QueryFunction | Function;
  constructor() {
    this.query = connectionMySql.query;
  }
}
