import { User } from "../entity/user.entity";
import { Request, Response, NextFunction } from "express";

import { validate } from "class-validator";
import * as userService from './../service/user.service'
import { generateJWT } from './../utils/encryptions'

export class userAuthController {

  static register = async (req: Request, res: Response, next: NextFunction) => {
    let { username, name, surname, email, photo, role, password } = req.body;
    let user: User;

    try {
      user = await userService.createUser({ username, name, surname, email, photo, role, password });
    } catch (error) {
      next(error)
    }

    const token = generateJWT(user);
    res.status(200).send(token);

  }

  static login = async (req: Request, res: Response, next: NextFunction) => {
    //Check if username and password are set
    let { username, password } = req.body;
    let user: User;

    try {
      user = await userService.loginUser(username, password);
    } catch (error) {
      next(error)
    }

    const token = generateJWT(user);
    res.status(200).send(token);

  };

  static changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = res.locals.jwtPayload;
    let user: User;

    try {
      user = await userService.changePassword(userId, oldPassword, newPassword);
    } catch (error) {
      next(error)
    }

    if (user) {
      res.status(200).send('password changed')
    }

  }
}
