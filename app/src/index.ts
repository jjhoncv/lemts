import express from "express";
import "reflect-metadata";
import path from "path";
import * as bodyParser from "body-parser";
import { default as helmet } from "helmet";
import { default as cors } from "cors";
import { createConnection } from "typeorm";
import logger from "./config/logger";

import { router } from "./routes";

import { User } from "./components/user/entity/user.entity";
import { Role } from "./components/user/entity/role.entity";
import { handleError } from "./errors/handleError";

const app: express.Application = express();

// app.use(express.static(path.join(__dirname, "../../public")));

createConnection()
  .then(async connection => {
    // logger.info('database connection created');
    // let role = new Role();
    // role.name = 'rol admin';

    // let user = new User();
    // user.name = 'jhonnatan'
    // user.surname = 'castro';
    // user.email = 'jjhoncv@gmail.com';
    // user.username = 'jjhoncv'
    // user.password = '123456';
    // user.photo = 'a.jpg';
    // user.role = role;

    // let roleRepository = connection.getRepository(Role);
    // let userRepository = connection.getRepository(User);

    // await roleRepository.save(role);
    // await userRepository.save(user);

    // console.log("user and role is saved");

    // app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/", router);
    app.use(handleError);
  })
  .catch(error => console.log(error));

// app.use(helmet());
// app.use(cors());

app.listen(8080);
