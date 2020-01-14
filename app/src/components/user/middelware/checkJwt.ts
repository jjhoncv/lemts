import { Request, Response, NextFunction } from "express";
import {
  generateJwt,
  verifyJwt
} from "../../../components/user/utils/jsonwebtoken";
import { JwtErrorException } from "../exceptions";

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.header("Authorization");
  const token = auth && auth.replace("Bearer ", "");

  const jwtPayload = await verifyJwt(token).catch(next);

  res.locals.jwtPayload = jwtPayload;

  const { id, username } = <any>jwtPayload;
  const newToken = generateJwt({ id, username });

  res.setHeader("token", newToken);

  next();
};
