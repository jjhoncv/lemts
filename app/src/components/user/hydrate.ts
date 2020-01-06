import { Section, Role } from "./entity/user";

export const SQLtoUserHydrate = async data => ({
  id: data.id_user,
  name: data.name_user,
  surname: data.surname_user,
  mail: data.mail_user,
  photo: data.photo_user,
  login: data.login_user,
  password: data.password_user,
  loginDate: data.login_date_user,
  reading: data.reading_user,
  writing: data.writing_user,
  role: await Role.init(data.id_role),
  sections: await Section.byUser(data.id_user)
});

export const UserToSQLHydrate = (data) => ({
  // id: data.id_user,
  // id: data.id_user,
  // role:
  // role: Role,
  // name: string,
  // surname: string,
  // mail: string,
  // photo: string,
  // login: string,


  // password: string,

  // loginDate: data.login_date_user,
  // reading: number,
  // writing: number,
});
