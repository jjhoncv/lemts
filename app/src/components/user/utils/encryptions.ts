import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import { jwtSecret, jwtExpires } from "../../../config";

export const verifyHash = async (password: string, hash: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: any, result: string) => {
      if (result) resolve(true);
      resolve(false);
    });
  });

export const generateJWT = (user) => {
  const token = jwt.sign(
    { userId: user.id, username: user.name },
    jwtSecret,
    { expiresIn: jwtExpires }
  );
  return token;
}

export const generateHash = async (password: string, saltRounds: number): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
      if (err) reject(err);
      resolve(hash);
    });
  });