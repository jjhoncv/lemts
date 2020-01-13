import { ErrorHandler } from "../../../errors/handleError";

export const ObjectNotFoundException = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};

export const FailAuthException = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};

export const FailMySQLConnectionException = (e: Error) => {
  throw new ErrorHandler(401, { data: { [e.name]: e.message } });
};
