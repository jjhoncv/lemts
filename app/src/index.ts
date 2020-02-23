import "reflect-metadata";
import { createConnection } from "typeorm";
import { FailMySQLConnectionException } from "./exception";
import { init } from "./app";

createConnection()
  .then(init)
  .catch(FailMySQLConnectionException);
