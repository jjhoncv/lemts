import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes";
import { handleError } from "./errors/handleError";
import { application } from "./config/application";
var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./../../app/swagger.json");

export class App {
  app: Application;
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  private settings() {
    this.app.set("port", application.port);
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
    this.app.use(handleError);
  }

  private routes() {
    this.app.use(application.url.base, router);
  }

  public listen() {
    this.app.listen(this.app.get("port"));
    console.log("Server on port", this.app.get("port"));
  }
}
