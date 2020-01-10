import { Request } from "express";
import * as userService from "./../service/user.service";
import { generateJWT } from "./../utils/encryptions";
import { IResponse } from "../types";

export class userAuthController {
  static register = async (req: Request, res: IResponse) => {
    const params = req.body;
    const user = await userService.createUser(params);
    const token = generateJWT(user);
    res.data = { token };
    res.status(200);
  };

  static login = async (req: Request, res: IResponse) => {
    const params = req.body;
    const user = await userService.loginUser(params);
    const token = generateJWT(user);
    res.data = { token };
    res.status(200)
  };

  static changePassword = async (req: Request, res: IResponse) => {
    const params = req.body;
    const { userId } = res.locals.jwtPayload;
    await userService.changePassword(userId, params);
    res.message = "password changed";
    res.status(200);
  };
}
