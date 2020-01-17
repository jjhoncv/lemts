import { body } from "express-validator";
import { validate } from "../../../utils";

export const checkChangePassword = validate([
  body("newPassword")
    .exists()
    .isLength({ max: 10 })
    .withMessage("should be less than 10 character."),
  body("oldPassword")
    .exists()
    .isLength({ max: 10 })
    .withMessage("should be less than 10 character.")
]);
