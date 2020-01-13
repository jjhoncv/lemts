import express from "express";
import { default as helmet } from "helmet";
import { default as cors } from "cors";
import { router } from "./routes";
import { handleError } from "./errors/handleError";
import { application } from "./config/application";

const app: express.Application = express();

export const init = async () => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(application.url.base, router);
  app.use(handleError);
  app.listen(8080);
};
