import { IResponse } from "../components/user/types";
import { validationResult } from "express-validator/src/validation-result";
import { ErrorHandler } from "../errors/handleError";

const hydrateResponse = (res: IResponse) => ({
  status: res.statusCode === 200 ? "success" : "",
  statusCode: res.statusCode,
  data: res.data,
  message: res.message
});

export const asyncHandler = fn => (req, res: any, next) => {
  Promise.resolve(fn(req, res, next))
    .then(() => {
      const response = hydrateResponse(res);
      res.json({ ...response });
    })
    .catch(next);
};

// can be reused by many routes
export const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    throw new ErrorHandler(422, { errors: errors.array() });
  };
};
