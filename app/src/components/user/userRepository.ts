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

  public async get(id: number) {
    const user = (
      await this.pool.query("SELECT * FROM user WHERE id = ?", [id])
    ).find((user) => user.id === id);

    const data: any = await Promise.all(
      (
        await this.pool.query("SELECT * FROM user_section WHERE userId = ?", [
          user.id,
        ])
      ).map(async (section) =>
        (
          await this.pool.query(
            "SELECT *, s.id as id_section, m.name as name_module, m.id as id_module FROM section s, module m WHERE s.id = ? AND m.id = s.moduleId",
            [section.sectionId]
          )
        ).find((item) => item.id_section === section.sectionId)
      )
    );

    return {
      id: user.id,
      lastLogin: user.lastLogin,
      reading: user.reading,
      writing: user.writing,
      role: (
        await this.pool.query("SELECT * FROM role WHERE id = ?", [user.roleId])
      ).find((role) => role.id === user.roleId),
      name: user.name,
      surname: user.surname,
      email: user.email,
      photo: user.photo,
      username: user.username,
      password: user.password,
      sections: data.map((sec) => ({
        id: sec.id_section,
        name: sec.name,
        url: sec.url,
        status: sec.status,
        module: {
          id: sec.id_module,
          name: sec.name_module,
        },
      })),
    };
  }

  public async add(user: User) {
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

  public async list() {
    const result = await this.pool.query("SELECT * from user");
    const users = await Promise.all(
      result.map(async (user: User) => await this.get(user.id))
    );

    return users;
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
