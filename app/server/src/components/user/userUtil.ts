import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { jwt } from "./../../config";
import { Payload } from "./userType";

export const verifyHash = async (password: string, hash: string) =>
  new Promise((resolve, reject) => {
    console.log(password, hash);
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

export const generateJwt = (payload) =>
  sign(payload, jwt.secret, { expiresIn: jwt.expiresIn });

export const verifyJwt = (token) =>
  new Promise<Payload>((resolve, reject) => {
    try {
      const payload = <Payload>verify(token, jwt.secret);
      resolve(payload);
    } catch (err) {
      reject(err);
    }
  });
