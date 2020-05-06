import { getRepository } from "typeorm";
import { User } from "./userModel";

import { verifyHash, generateHash } from "./userUtil";
import { ObjectNotFoundException, FailAuthException } from "./userException";
import { UserRepository } from "./userRepository";
import { RoleRepository } from "./../role/roleRepository";

export const createUser = async (params) => {
  const roleRepository = new RoleRepository();

  const role = await roleRepository
    .findOneOrFail({ field: "id", value: params.role })
    .catch(ObjectNotFoundException);

  let user = new User();
  user = { ...params };
  user.password = await generateHash(params.password, 10);
  user.role = role;

  const userRepository = new UserRepository();
  await userRepository.create(user).catch(ObjectNotFoundException);

  return user;
};

export const loginUser = async ({ username, password }) => {
  const userRepository = new UserRepository();
  const user = await userRepository
    .findOneOrFail({ field: "username", value: username })
    .catch(ObjectNotFoundException);

  await verifyHash(password, user.password).catch(FailAuthException);
  return user;
};

export const changePassword = async (id, { oldPassword, newPassword }) => {
  const userRepository = getRepository(User);

  const user = await userRepository
    .findOneOrFail({ id })
    .catch(ObjectNotFoundException);

  await verifyHash(oldPassword, user.password).catch(FailAuthException);

  user.password = await generateHash(newPassword, 10);
  userRepository.save(user).catch(ObjectNotFoundException);
};
