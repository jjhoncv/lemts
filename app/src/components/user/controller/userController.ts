import { Request } from "express";
import * as userService from "../service/user.service";
import { generateJwt } from "../utils/jsonwebtoken";
import { IResponse } from "../interface";

export class userController {
  static register = async (req: Request, res: IResponse) => {
    const params = req.body;
    const { id, username } = await userService.createUser(params);
    const token = generateJwt({ id, username });
    res.data = { token };
    res.status(200);
  };

  static login = async (req: Request, res: IResponse) => {
    const params = req.body;
    const { id, username } = await userService.loginUser(params);
    const token = generateJwt({ id, username });
    res.data = { token };
    res.status(200);
  };

  static changePassword = async (req: Request, res: IResponse) => {
    const params = req.body;
    const { id } = res.locals.jwtPayload;
    await userService.changePassword(id, params);
    res.message = "password changed";
    res.status(200);
  };
}
