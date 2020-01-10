import { Response } from "express";

export class ErrorHandler extends Error {
  public statusCode: number;
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

interface IError {
  statusCode: number;
  message: string | object;
  name: string;
}


export const handleError = (err: IError, req, res: Response, next) => {

  const { statusCode, message, name } = {
    ...err,
    statusCode: err.statusCode || 400
  };
  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    name,
    message
  });
};
