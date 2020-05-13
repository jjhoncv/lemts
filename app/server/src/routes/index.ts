import { Router } from "express";
import { userRouter } from "./../components/index";

const routes = Router();

routes.use("/user", userRouter);

export const router = routes;
