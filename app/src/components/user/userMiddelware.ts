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

  const jwtPayload = await verifyJwt(token).catch(JwtErrorException);

  res.locals.jwtPayload = jwtPayload;

  const { id, username } = jwtPayload;
  const newToken = generateJwt({ id, username });

  res.setHeader("token", newToken);

  next();
};



import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user.entity";
import { getRepository } from 'typeorm';
import { Role } from "../entity/role.entity";


export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    let user: User;
    try {
      user = await getRepository(User).findOne(id);
    } catch (id) {
      res.status(401).send();
    }

    let role = await getRepository(Role).findOne(user.role)

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(role.name) > -1) next();
    else res.status(401).send();
  };
};
