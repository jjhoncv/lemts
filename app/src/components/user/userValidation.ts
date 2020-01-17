import { body } from "express-validator";
import { validate } from "./userUtil";

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


import { body } from "express-validator";

import { validate } from "../../../utils";

export const checkRegister = validate([
  body("name")
    .exists()
    .isLength({ max: 30 })
    .withMessage("should be less than 30 character."),
  body("surname")
    .exists()
    .isLength({ max: 30 })
    .withMessage("should be less than 30 character."),
  body("email")
    .exists()
    .isLength({ max: 40 })
    .withMessage("should be less than 30 character."),
  body("username")
    .exists()
    .isLength({ max: 30 })
    .withMessage("should be less than 30 character."),
  body("password")
    .exists()
    .isLength({ max: 60 })
    .withMessage("should be less than 60 character."),
  body("photo")
    .exists()
    .isLength({ max: 70 })
    .withMessage("should be less than 70 character."),
  body("role")
    .exists()
    .isNumeric()
    .withMessage("should be number.")
]);
