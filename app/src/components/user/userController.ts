import { Request, Response } from "express";
import * as userService from "./service/user.service";
import { generateJwt } from "./utils/jsonwebtoken";

export class userController {
  static register = async (req: Request, res: Response) => {
    const params = req.body;
    const { id, username } = await userService.createUser(params);
    const token = generateJwt({ id, username });

    res.status(201).json({
      status: "success",
      statusCode: res.statusCode,
      data: { token }
    });
  };

  static login = async (req: Request, res: Response) => {
    const params = req.body;
    const { id, username } = await userService.loginUser(params);
    const token = generateJwt({ id, username });

    res.status(200).json({
      status: "success",
      statusCode: res.statusCode,
      data: { token }
    });
  };

  static changePassword = async (req: Request, res: Response) => {
    const params = req.body;
    const { id } = res.locals.jwtPayload;
    await userService.changePassword(id, params);

    res.status(200).json({
      status: "success",
      statusCode: res.statusCode,
      message: "password was changed"
    });
  };
}
