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
