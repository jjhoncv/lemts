import { User } from "../entity/user";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret, jwtExpires } from "../../../configs";
import { validate } from "class-validator";

export class userAuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    let user: User;
    try {
      // user = await userRepository.findOneOrFail({ where: { username } });
      user = await User.findByUsername(username);
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match

    if (!User.checkIfUnencryptedPasswordIsValid(password, user.password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.name },
      jwtSecret,
      { expiresIn: jwtExpires }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    console.log('id', id)

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send('fail passwords iguales');
    }

    //Get user from the database
    let user: User;
    try {
      // user = await userRepository.findOneOrFail(id);
      user = await User.init(id);
    } catch (id) {
      res.status(401).send('fail pidiendo usuario');
    }

    //Check if old password matchs
    if (!User.checkIfUnencryptedPasswordIsValid(oldPassword, user.password)) {
      res.status(401).send('fail validation encript');
      return;
    }

    //Validate de model (password length)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    User.update(user);

    res.status(204).send('all ok');
  };
}
