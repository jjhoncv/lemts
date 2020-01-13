import { Router } from "express";
import { router as userRouter } from "./../components/user/router";
import { router as indexRouter } from "./../components/index/router";

const routes = Router();

routes.use("/", indexRouter);
routes.use("/", userRouter);

export const router = routes;
