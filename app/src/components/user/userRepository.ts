import { User } from "./userModel";
import { Repository } from "./../../model/Repository";
import moment from "moment";

interface UserDAO {
  id: number;
  lastLogin?: string;
  reading?: boolean;
  writing?: boolean;
  roleId: number;
  name: string;
  surname: string;
  email: string;
  photo: string;
  username: string;
  password: string;
}

export class UserRepository extends Repository {
  constructor() {
    super();
  }

  public async create(user: User) {
    let params: UserDAO = {
      id: user.id,
      lastLogin: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      reading: true,
      writing: true,
      roleId: user.role.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      photo: user.photo,
      username: user.username,
      password: user.password,
    };

    await this.pool.query("INSERT INTO user SET ?", params);
  }

  public async findOneOrFail({ field, value }) {
    const result = await this.pool.query("SELECT * FROM user WHERE ?? = ?", [
      field,
      value,
    ]);
    let user = new User();
    user = { ...result[0] };
    return user;
  }

  public async byId(id: number) {
    const result = await this.pool.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    let user = new User();
    user = { ...result[0] };
    return user;
  }

  public update(user: User) {}
  private delete(user: User) {}
}
