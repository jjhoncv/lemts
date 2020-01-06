import { sql } from "../../../helpers/mysql";
import { SQLtoUserHydrate, UserToSQLHydrate } from "../hydrate";
import * as bcrypt from "bcryptjs";
import { Length, IsNotEmpty } from "class-validator";

export class Role {
  id: number;
  name: string;
  order: number;

  public static async init(id: number) {
    const role = new Role();
    const [data] = await sql.query(`SELECT * FROM roles WHERE id_role='${id}'`);
    role.id = id;
    role.name = data.name_role;
    role.order = data.order_role;
    return role;
  }
}

export class Module {
  id: number;
  name: string;

  public static async init(id: number) {
    const module = new Module();
    const [data] = await sql.query(
      `SELECT * FROM modules WHERE id_module='${id}'`
    );

    module.id = id;
    module.name = data.name_module;
    return module;
  }
}

export class Section {
  id: number;
  module: Module;
  name: string;
  url: string;
  status: number;

  public static async init(id: number) {
    const section = new Section();
    const [data] = await sql.query(
      `SELECT * FROM sections WHERE id_section='${id}'`
    );
    section.id = id;
    section.module = await Module.init(data.id_module);
    section.name = data.name_section;
    section.url = data.url_section;
    section.status = data.status_section;
    return section;
  }

  public static async byUser(id: number) {
    const sections = await sql.query(
      `SELECT * FROM users_sections WHERE id_user='${id}'`
    );
    return Promise.all<Section>(
      sections.map(
        async (item: { id_section: number }) =>
          await Section.init(item.id_section)
      )
    );
  }
}

export class User {
  public id: number;
  public role: Role;
  public name: string;
  public surname: string;
  public mail: string;
  public photo: string;
  public login: string;

  @Length(4, 100)
  public password: string;

  public loginDate: Date;
  public reading: number;
  public writing: number;
  public sections: Section[];

  public static async init(id: number) {
    const user = new User();
    const [results] = await sql.query(
      `SELECT * FROM users WHERE id_user='${id}'`
    );
    const data = await SQLtoUserHydrate(results);

    Object.keys(data).forEach(item => {
      user[item] = data[item];
    });

    return user;
  }

  public static async allUser() {
    const results = await sql.query(`SELECT * FROM users`);
    return Promise.all(
      results.map(async (result: User) => await SQLtoUserHydrate(result))
    );
  }

  public static checkIfUnencryptedPasswordIsValid(
    unencryptedPassword: string,
    decryptedPassword: string
  ) {
    return bcrypt.compareSync(unencryptedPassword, decryptedPassword);
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public static async findByUsername(username: string) {
    const user = new User();
    const [results] = await sql.query(
      `SELECT * FROM users WHERE login_user='${username}'`
    );

    const data = await SQLtoUserHydrate(results);

    Object.keys(data).forEach(item => {
      user[item] = data[item];
    });

    return user;
  }

  public static async update(user: User) {
    await sql.query(`UPDATE users SET
        id_role='${user.role.id}',
        name_user='${user.name}',
        surname_user='${user.surname}',
        mail_user='${user.mail}',
        photo_user='${user.photo}',
        login_user='${user.login}',
        password_user='${user.password}',
        login_date_user='${user.loginDate}',
        reading_user='${user.reading}',
        writing_user='${user.writing}'
      WHERE id_user='${user.id}'
    `);
  }

  public static async insert(user: User) {
    await sql.query(`INSERT INTO users (
        id_user,
        id_role,
        name_user,
        surname_user,
        mail_user,
        photo_user,
        login_user,
        password_user,
        login_date_user,
        reading_user,
        writing_user
        ) VALUES (
          '',
          '${user.role}',
          '${user.name}',
          '${user.surname}',
          '${user.mail}',
          '${user.photo}',
          '${user.login}',
          '${user.password}',
          '${user.loginDate}',
          '${user.reading}',
          '${user.writing}'
          )`);
  }
}
