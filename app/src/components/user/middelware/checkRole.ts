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
