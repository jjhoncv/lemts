import { body } from "express-validator";

import { validate } from "../../../utils";

export const checkLogin = validate([
  body("username")
    .exists()
    .isLength({ max: 30 })
    .withMessage("should be less than 30 character."),
  body("password")
    .exists()
    .isLength({ max: 60 })
    .withMessage("should be less than 60 character."),
]);
