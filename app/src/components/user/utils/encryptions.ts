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
