import { ErrorHandler } from "./../../errors/handleError";

export const JwtErrorException = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};

export const FailAuthException = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};

export const JsonWebTokenError = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};

export const JwtNotBeforeError = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};

export const JwtTokenExpiredError = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};
