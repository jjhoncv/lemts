// import { getRepository } from "typeorm";
// import { User } from "./userModel";

import { verifyHash, generateHash } from "./userUtil";
import { FailAuthException } from "./userException";
import { ObjectNotFoundException } from "./../../exception";
import { UserRepository } from "./userRepository";
import * as roleService from "./../role/roleService";
import moment from "moment";
import { User } from "./userType";

export const addUser = async (params) => {
  let user: User = { ...params };
  user.lastLogin = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  user.reading = true;
  user.writing = true;
  user.password = await generateHash(params.password, 10);
  user.role = await roleService.getRole(params.role);

  const userRepository = new UserRepository();
  await userRepository.add(user).catch(ObjectNotFoundException);

  return user;
};

export const updateUser = async (params) => {
  let user: User = { ...params };
  
  // console.log('user', user)
  // user.password = await generateHash(params.password, 10);
  // user.role = await roleService.getRole(params.role);

  const userRepository = new UserRepository();
  await userRepository.update(user).catch(ObjectNotFoundException);

  return user;
};

export const listUser = async () => {
  const userRepository = new UserRepository();
  const users = await userRepository.list().catch(ObjectNotFoundException);
  return users;
};

export const getUser = async (id: number) => {
  const userRepository = new UserRepository();
  const user = await userRepository.get(id).catch(ObjectNotFoundException);
  return user;
};

export const loginUser = async ({ username, password }) => {
  const userRepository = new UserRepository();
  const user = await userRepository
    .find({ field: "username", value: username })
    .catch(ObjectNotFoundException);

  await verifyHash(password, user.password).catch(FailAuthException);
  return user;
};

export const changePassword = async (id, { oldPassword, newPassword }) => {
  // const userRepository = getRepository(User);
  const userRepository = new UserRepository();
  let user = await userRepository.get(id).catch(ObjectNotFoundException);

  // const user = await userRepository
  //   .findOneOrFail({ id })
  //   .catch(ObjectNotFoundException);

  await verifyHash(oldPassword, user.password).catch(FailAuthException);

  user.password = await generateHash(newPassword, 10);

  await userRepository.update(user).catch(ObjectNotFoundException);
};
