import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    let user: User;
    try {
      user = await User.init(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role.name) > -1) next();
    else res.status(401).send();
  };
};
