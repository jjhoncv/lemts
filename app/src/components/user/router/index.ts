import { Router } from "express";
import { userRouter } from "./userRouter";
import { userAuthRouter } from "./userAuthRouter";
import { userMeRouter } from "./userMeRouter";

const routes = Router();

// routes.use("/auth", authRouter);
routes.use("/user/auth", userAuthRouter);
routes.use("/user/me", userMeRouter);
routes.use("/user", userRouter);

export const router = routes;
