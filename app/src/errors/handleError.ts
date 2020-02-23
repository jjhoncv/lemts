import { Response } from "express";
import { IError } from "./../type";

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
  // console.log('err', err)
  const { statusCode } = err;
  res.status(statusCode).json({ ...err });
};
