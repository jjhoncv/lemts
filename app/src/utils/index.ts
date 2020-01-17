import { IResponse } from "../components/user/interface";
import { validationResult } from "express-validator";
import { ErrorHandler } from "./../type/index";

export const asyncHandler = fn => (req, res: any, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// can be reused by many routes
export const validate = validations => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));

  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => ({
    [param]: msg
  });

  const errors = validationResult(req)
    .formatWith(errorFormatter)
    .array();
  let failMsg = null;

  if (errors && errors.length) {
    failMsg = new ErrorHandler(422, { data: errors });
  }

  next(failMsg);
};


// import { Response } from "express";

export class ErrorHandler extends Error {
  public statusCode: number;
  public data: object;
  public msg: string;
  public status: string;

  constructor(statusCode: number, arg: { msg?: any; data?: any }) {
    super();
    this.status = "error";
    this.statusCode = statusCode;
    this.msg = arg.msg;
    this.data = arg.data;
  }
}

export const handleError = (err: IError, req, res: Response, next) => {
  const { statusCode } = err;
  res.status(statusCode).json({ ...err });
};
