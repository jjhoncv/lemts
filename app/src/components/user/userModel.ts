import { Role } from "../role/roleModel";
import { Repository } from "../../model/Repository";
import { UserDAO, Section } from "./userType";

export class User extends Repository {
  public id: number;
  public name: string;
  public surname: string;
  public username: string;
  public password: string;
  public email: string;
  public photo: string;
  public role: Role;
  public reading: boolean;
  public writing: boolean;
  public lastLogin: string;

  constructor() {
    super();
  }

  public async get(id: number) {
    const user: UserDAO = await this.queryOne(
      "SELECT * FROM user WHERE id = ?",
      [id]
    );

    const role = await this.queryOne("SELECT * FROM role WHERE id = ?", [
      user.roleId
    ]);

    const sectionsByUser: any[] = await this.pool.query(
      "SELECT * FROM user_section WHERE userId = ?",
      [user.id]
    );

    const getModuleBySection = async section => {
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
          name: sec.name_module
        }
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
      sections: sections
    };
  }
}
