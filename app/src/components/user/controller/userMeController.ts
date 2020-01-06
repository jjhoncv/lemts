import { User } from "../entity/user";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { SQLtoUserHydrate, UserToSQLHydrate } from "../hydrate";

export class userMeController {
  static listAll = async (req, res, next) => {
    const users = await User.allUser();
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const user = await User.init(id);
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let request = req.body;

    let user = new User();
    user.role = request.id_role;
    user.name = request.name_user;
    user.surname = request.surname_user;
    user.mail = request.mail_user;
    user.photo = request.photo_user;
    user.login = request.login_user;
    user.password = request.password_user;
    user.loginDate = request.login_date_user;
    user.reading = request.reading_user;
    user.writing = request.writing_user;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    try {
      await User.insert(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created");
  };

  // static editUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   //Get values from the body
  //   const { username, role } = req.body;

  //   //Try to find user on database
  //   const userRepository = getRepository(User);
  //   let user;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     //If not found, send a 404 response
  //     res.status(404).send("User not found");
  //     return;
  //   }

  //   //Validate the new values on model
  //   user.username = username;
  //   user.role = role;
  //   const errors = await validate(user);
  //   if (errors.length > 0) {
  //     res.status(400).send(errors);
  //     return;
  //   }

  //   //Try to safe, if fails, that means username already in use
  //   try {
  //     await userRepository.save(user);
  //   } catch (e) {
  //     res.status(409).send("username already in use");
  //     return;
  //   }
  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };

  // static deleteUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   const userRepository = getRepository(User);
  //   let user: User;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     res.status(404).send("User not found");
  //     return;
  //   }
  //   userRepository.delete(id);

  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };
}
