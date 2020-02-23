import { Router } from "express";
import { userRouter } from "./../components/user/userRouter";
import { router as indexRouter } from "./../components/index/router";

const routes = Router();

routes.use("/", indexRouter);
routes.use("/user", userRouter);

export const router = routes;
