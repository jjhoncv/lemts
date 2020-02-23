import { getRepository } from "typeorm";
import { User } from "./userEntity";
import { Role } from "./roleEntity";

import { verifyHash, generateHash } from "./userUtil";
import { ObjectNotFoundException, FailAuthException } from "./userException";

export const createUser = async params => {
  let roleRepository = getRepository(Role);
  let role = await roleRepository
    .findOneOrFail({ id: params.role })
    .catch(ObjectNotFoundException);

  let user = new User();
  user = { ...params };
  user.password = await generateHash(params.password, 10);
  user.role = role;

  await getRepository(User)
    .save(user)
    .catch(ObjectNotFoundException);
  return user;
};

export const loginUser = async ({ username, password }) => {
  const userRepository = getRepository(User);
  console.log(username, password);
  const user = await userRepository
    .findOneOrFail({ username })
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
