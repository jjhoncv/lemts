import { Router } from "express";
import { userController } from "./userController";
import { asyncHandler } from "../../utils";
import { checkJwt } from "./userMiddelware";

import {
  checkChangePassword,
  checkRegister,
  checkLogin
} from "./userValidation";

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
