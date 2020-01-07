import { User } from "../entity/user.entity";
import { Request, Response } from "express";

import { validate } from "class-validator";
import * as userService from './../service/user.service'
import { generateJWT } from './../utils/encryptions'

export class userAuthController {

  static register = async (req: Request, res: Response) => {
    let { username, name, surname, email, photo, role, password } = req.body;
    let user: User;
    try {
      user = await userService.createUser({ username, name, surname, email, photo, role, password });
    } catch (e) {
      res.status(401).send('username exists');
    }
    if (user) {
      const token = generateJWT(user);
      res.send(token);
    } else {
      res.status(401).send('invalid credentials');
    }

  }

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set

    let { username, password } = req.body;
    const user = await userService.loginUser(username, password);

    if (user) {
      const token = generateJWT(user);
      res.send(token);
    } else {
      res.status(401).send('invalid credentials');
    }
  };

  // static changePassword = async (req: Request, res: Response) => {
  //   //Get ID from JWT
  //   const id = res.locals.jwtPayload.userId;

  //   console.log('id', id)

  //   //Get parameters from the body
  //   const { oldPassword, newPassword } = req.body;
  //   if (!(oldPassword && newPassword)) {
  //     res.status(400).send('fail passwords iguales');
  //   }

  //   //Get user from the database
  //   let user: User;
  //   try {
  //     // user = await userRepository.findOneOrFail(id);
  //     user = await User.init(id);
  //   } catch (id) {
  //     res.status(401).send('fail pidiendo usuario');
  //   }

  //   //Check if old password matchs
  //   if (!User.checkIfUnencryptedPasswordIsValid(oldPassword, user.password)) {
  //     res.status(401).send('fail validation encript');
  //     return;
  //   }

  //   //Validate de model (password length)
  //   user.password = newPassword;
  //   const errors = await validate(user);
  //   if (errors.length > 0) {
  //     res.status(400).send(errors);
  //     return;
  //   }
  //   //Hash the new password and save
  //   user.hashPassword();
  //   User.update(user);

  //   res.status(204).send('all ok');
  // };
}
