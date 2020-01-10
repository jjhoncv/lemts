import { Request, NextFunction } from "express";
import { IResponse } from './../types'
import { validationResult, body } from 'express-validator';
import { ErrorHandler } from "../../../errors/handleError";

export const checkLogin = [
  body('username').exists().isLength({ min: 2 }).withMessage('should be more than 2 character.'),
  (req: Request, res: IResponse, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(422, { errors: errors.array() })
    } else {
      next();
    }
  }
]