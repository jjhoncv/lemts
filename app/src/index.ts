import "reflect-metadata";
import { createConnection } from "typeorm";
import { FailMySQLConnectionException } from "./components/user/exceptions";
import { init } from "./app";

createConnection()
  .then(init)
  .catch(FailMySQLConnectionException);
