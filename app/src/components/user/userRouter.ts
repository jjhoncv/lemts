import { Router } from "express";
import { userController } from "./userController";
import { asyncHandler } from "../../utils";
import { checkJwt, checkRole } from "./userMiddelware";

import {
  checkChangePassword,
  checkRegister,
  checkLogin
} from "./userValidation";

const router: Router = Router();

// Login route
router.post("/login", [checkLogin], asyncHandler(userController.login));

// Change my password
router.post(
  "/change-password",
  [checkChangePassword, asyncHandler(checkJwt)],
  asyncHandler(userController.changePassword)
);

// CRUD

// User add
router.post("/add", [checkRegister], asyncHandler(userController.add));

// User list
router.get("/", asyncHandler(userController.list));

// User me
router.get("/:id", asyncHandler(userController.me));

// User me update
router.post("/:id", asyncHandler(userController.update));


export const userRouter: Router = router;
