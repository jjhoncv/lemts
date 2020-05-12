import { UserDAO, User, Section } from "./userType";
import { Repository } from "../../model/Repository";

const hydrate = (user: User) => ({
  id: user.id,
  name: user.name,
  lastLogin: user.lastLogin,
  reading: user.reading,
  writing: user.writing,
  roleId: user.role.id,
  surname: user.surname,
  email: user.email,
  photo: user.photo,
  username: user.username,
  password: user.password,
});

export class UserRepository extends Repository {
  constructor() {
    super();
  }

  public async add(user: User) {
    const data = hydrate(user);
    await this.pool.query("INSERT INTO user SET ?", data);
  }

  public async update(user: User) {
    const { id, ...data } = user;
    await this.pool.query(`UPDATE user SET ? WHERE id = ${user.id}`, {
      ...data,
    });
  }

  public async list() {
    const result = await this.pool.query("SELECT * from user");
    const users = (await Promise.all(
      result.map(async (user: User) => await this.get(user.id))
    )) as User[];

    return users;
  }

  public async find({ field, value }) {
    const result = await this.pool.query("SELECT * FROM user WHERE ?? = ?", [
      field,
      value,
    ]);
    // let user = new User();
    let user: User = { ...result[0] };
    return user;
  }

  private delete(user: User) {}

  public async get(id: number) {
    const user: UserDAO = await this.queryOne(
      "SELECT * FROM user WHERE id = ?",
      [id]
    );

    const role = await this.queryOne("SELECT * FROM role WHERE id = ?", [
      user.roleId,
    ]);

    const sectionsByUser: any[] = await this.pool.query(
      "SELECT * FROM user_section WHERE userId = ?",
      [user.id]
    );

    const getModuleBySection = async (section) => {
      let sec = await this.queryOne(
        `SELECT *, s.id as id_section, m.name as name_module, m.id as id_module 
        FROM section s, module m 
        WHERE s.id = ? 
        AND m.id = s.moduleId`,
        [section.sectionId]
      );
      return {
        id: sec.id_section,
        name: sec.name,
        url: sec.url,
        status: sec.status,
        module: {
          id: sec.id_module,
          name: sec.name_module,
        },
      };
    };

    const querys = sectionsByUser.map(getModuleBySection);
    const sections: Section[] = await Promise.all(querys);

    return {
      id: user.id,
      lastLogin: user.lastLogin,
      reading: user.reading,
      writing: user.writing,
      role: role,
      name: user.name,
      surname: user.surname,
      email: user.email,
      photo: user.photo,
      username: user.username,
      password: user.password,
      sections: sections,
    } as User;
  }
}
