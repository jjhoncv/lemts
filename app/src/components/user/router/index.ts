import { Router } from "express";
// import { userRouter } from "./userRouter";
import { userAuthRouter } from "./userAuthRouter";
import { userSectionRouter } from "./userSectionRouter";

const routes = Router();

// routes.use("/auth", authRouter);
routes.use("/user/auth", userAuthRouter);
// routes.use("/user/me", userMeRouter);
// routes.use("/user", userRouter);

routes.use("/user", userSectionRouter);

export const router = routes;
