import { usersDAL } from './usersDAL'

export const getUsers = async (req, res, next) => {
  let results = await usersDAL.getUsers();
  res.status(200).send(results);
}
