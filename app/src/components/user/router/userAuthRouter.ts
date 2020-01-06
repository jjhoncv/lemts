import { Router } from "express";
import { userAuthController } from "../controller";
import { checkJwt } from "../middelware";

const router: Router = Router();

// Login route
router.post("/login", userAuthController.login);

// Register route
router.post("/login", userAuthController.register);

// Change my password
router.post("/change-password", [checkJwt], userAuthController.changePassword);

export const authRouter: Router = router;
