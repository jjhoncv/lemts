import { Router } from "express";
import { userController } from "./controller";
import { asyncHandler } from "../../utils";
import {
  checkChangePassword,
  checkRegister,
  checkJwt,
  checkLogin
} from "./middelware";

const router: Router = Router();

// Login route
router.post("/login", [checkLogin], asyncHandler(userController.login));

// Register route
router.post(
  "/register",
  [checkRegister],
  asyncHandler(userController.register)
);

// Change my password
router.post(
  "/change-password",
  [checkChangePassword, asyncHandler(checkJwt)],
  asyncHandler(userController.changePassword)
);

export const userRouter: Router = router;
