import { User } from "../entity/user.entity";
import { Request, Response, NextFunction } from "express";

import { validate } from "class-validator";
import * as userService from "./../service/user.service";
import { generateJWT } from "./../utils/encryptions";

interface IResponse extends Response {
  data: object;
  message: string;
}

export class userAuthController {
  static register = async (req: Request, res: IResponse) => {
    const params = req.body;
    const user = await userService.createUser({ ...params });
    const token = generateJWT(user);
    res.data = { token };
    res.status(200);
  };

  static login = async (req: Request, res: IResponse) => {
    const params = req.body;
    const user = await userService.loginUser({ ...params });
    const token = generateJWT(user);
    res.data = { token };
    res.status(200);
  };

  static changePassword = async (req: Request, res: IResponse) => {
    const params = req.body;
    const { userId } = res.locals.jwtPayload;
    await userService.changePassword(userId, { ...params });
    res.message = "password changed";
    res.status(200);
  };
}
