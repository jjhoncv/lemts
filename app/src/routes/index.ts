import { Router } from "express";
import { router as userRouter } from "./../components/user/router";
import { router as indexRouter } from "./../components/index/router";
// import { router as sectionRouter } from "./../components/section/router";

const routes = Router();

routes.use("/", indexRouter);
routes.use("/", userRouter);
// routes.use("/", sectionRouter);

export const router = routes;
