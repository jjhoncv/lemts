import { body } from "express-validator";

import { validate } from "../../../utils";

export const checkLogin = validate([
  body("username")
    .exists()
    .isLength({ max: 10 })
    .withMessage("should be less than 10 character."),
  body("password")
    .exists()
    .isLength({ max: 10 })
    .withMessage("should be less than 10 character."),
]);
