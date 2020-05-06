import { Role } from "../role/roleModel";

export class User {
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

  constructor() {}
}
