import express from "express";
import path from "path";
import  * as bodyParser  from "body-parser";
import { default as helmet } from "helmet";
import { default as cors } from "cors";

import { router } from "./routes";

const app: express.Application = express();

app.use(express.static(path.join(__dirname, "../../public")));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/", router);

app.listen(8080);
