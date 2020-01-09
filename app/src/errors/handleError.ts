import { Request, Response, NextFunction } from "express";

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
  message: string;
  name: string;
}

export const handleError = (err: IError, res: Response) => {
  // console.log("err", err);

  const { statusCode, message, name } = {
    ...err,
    statusCode: err.statusCode || 400
  };
  // const
  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    name,
    message
  });
};
