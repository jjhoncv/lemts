import { sign, verify } from "jsonwebtoken";
import { jwt } from "../../../config";

export const generateJwt = payload =>
  sign(payload, jwt.secret, { expiresIn: jwt.expiresIn });

export const verifyJwt = token =>
  new Promise((resolve, reject) => {
    try {
      const payload = verify(token, jwt.secret);
      resolve(payload);
    } catch (err) {
      reject(err);
    }
  });
