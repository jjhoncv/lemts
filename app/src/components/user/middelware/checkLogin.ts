import { body } from "express-validator";

import { validate } from "../../../utils";

export const checkLogin = validate([
  body("username")
    .exists()
    .isLength({ min: 2 })
    .withMessage("should be more than 2 character.")
]);
