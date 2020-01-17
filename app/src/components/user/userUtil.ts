import { compare, hash } from "bcrypt";

export const verifyHash = async (password: string, hash: string) =>
  new Promise((resolve, reject) => {
    compare(password, hash, (err: any, result: any) => {
      if (result) resolve(true);
      else {
        const error = new Error();
        error.name = "FailVerifyHash";
        error.message = "Fail verification password";
        reject(error);
      }
    });
  });

export const generateHash = async (
  password: string,
  saltRounds: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    hash(password, saltRounds, (err: any, hash: string) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

import { sign, verify } from "jsonwebtoken";
import { jwt } from "../../../config";
import { Payload } from "../interface";

export const generateJwt = payload =>
  sign(payload, jwt.secret, { expiresIn: jwt.expiresIn });

export const verifyJwt = token =>
  new Promise<Payload>((resolve, reject) => {
    try {
      const payload = <Payload>verify(token, jwt.secret);
      resolve(payload);
    } catch (err) {
      reject(err);
    }
  });


  import { Response } from "express";

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
