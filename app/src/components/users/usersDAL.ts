import { sql } from '../../helpers/mysql'

const getUsers = async () => {
  const results = await sql.query("SELECT * FROM users");
  return results;
}

export const usersDAL = {
  getUsers
}
