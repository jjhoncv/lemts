import { ObjectNotFoundException } from "./../../exception";
import { RoleRepository } from "./../role/roleRepository";

export const getRole = async (id) => {
  const roleRepository = new RoleRepository();

  return await roleRepository
    .findOneOrFail({ field: "id", value: id })
    .catch(ObjectNotFoundException);
};
