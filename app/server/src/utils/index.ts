import { validationResult } from "express-validator";
import { ErrorHandler } from "./../errors/handleError";

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
