import { Router, Request, Response } from "express";
import { checkJwt } from "../middelware/checkJwt";
import { checkRole } from "../middelware";
import { userController } from "../controller";

const router = Router();

// get all users
router.get("/", [checkJwt, checkRole(["Admin"])], userController.listAll);

// get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["Admin"])],
  userController.getOneById
);

//Create a new user
router.post("/", [checkJwt, checkRole(["Admin"])], userController.newUser);

export const userRouter = router;
