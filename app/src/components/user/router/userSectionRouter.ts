import { Router } from "express";
import { checkJwt } from "../middelware/checkJwt";
import { checkRole } from "../middelware";
import { userSectionController } from "../controller";

const router = Router();

// get all sections by user
router.get("/:id([0-9]+)/section", [checkJwt, checkRole(["admin"])], userSectionController.list);

// get one user
router.post("/:id([0-9]+)/section", [checkJwt, checkRole(["admin"])], userSectionController.add);

//Create a new user
router.delete("/:id([0-9]+)/section", [checkJwt, checkRole(["admin"])], userSectionController.remove);

export const userSectionRouter = router;
