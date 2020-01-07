import { Router, Request, Response } from "express";
import { checkJwt } from "../middelware/checkJwt";
import { checkRole } from "./../middelware";
// import { sectionController } from "../controller";

const router = Router();



// /user/${id}/section            : get [ checkJwt, checkRole ]
//     sectionService.getAll()

// /user/${id}/section            : post [ checkJwt, checkRole, validator ]
//     sectionService.createSections(
//         id,
//         [sectionIds]
//     )

// /user/${id}/section            : delete [ checkJwt, checkRole, validator ]
//     sectionService.deleteSections(
//         id,
//         [sectionIds]
//     )

// // get all users
// router.get("/:id([0-9]+)/section", [checkJwt, checkRole(["Admin"])], sectionController.listAll);

// // get all users
// router.get("/", [checkJwt, checkRole(["Admin"])], userController.listAll);

// // get one user
// router.get(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["Admin"])],
//   userController.getOneById
// );

// //Create a new user
// router.post("/", [checkJwt, checkRole(["Admin"])], userController.newUser);

export const userRouter = router;
