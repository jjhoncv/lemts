import { Router } from "express";
import { userAuthController } from "../controller";
import { checkJwt } from "../middelware";
import { asyncHandler } from "../../../utils";
import { checkLogin } from "../middelware/checkLogin";


const router: Router = Router();

// Login route
router.post(
  "/login",
  [checkLogin],
  asyncHandler(userAuthController.login)
);

// Register route
router.post("/register", asyncHandler(userAuthController.register));

// Change my password
router.post(
  "/change-password",
  [checkJwt],
  asyncHandler(userAuthController.changePassword)
);

export const userAuthRouter: Router = router;
