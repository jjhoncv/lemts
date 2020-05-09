import { Request, Response } from "express";
import * as userService from "./userService";
import { generateJwt } from "./userUtil";

export class userController {
  static login = async (req: Request, res: Response) => {
    const params = req.body;
    const { id, username } = await userService.loginUser(params);
    const token = generateJwt({ id, username });

    res.status(200).json({
      status: "success",
      statusCode: res.statusCode,
      data: { token },
    });
  };

  static changePassword = async (req: Request, res: Response) => {
    const params = req.body;
    const { id } = res.locals.jwtPayload;
    await userService.changePassword(id, params);

    res.status(200).json({
      status: "success",
      statusCode: res.statusCode,
      message: "password was changed",
    });
  };

  // crud

  static add = async (req: Request, res: Response) => {
    const params = req.body;
    const { id, username } = await userService.addUser(params);
    const token = generateJwt({ id, username });

    res.status(201).json({
      status: "success",
      statusCode: res.statusCode,
      data: { token },
    });
  };

  static list = async (req: Request, res: Response) => {
    const users = await userService.listUser();

    res.status(200).json({
      status: "success",
      statusCode: res.statusCode,
      data: users,
    });
  };
}
