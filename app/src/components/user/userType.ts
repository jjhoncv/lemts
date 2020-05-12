import { Role } from "../role/roleModel";

export interface Payload {
  id: number;
  username: string;
}

export interface User {
  id: any;
  name: string;
  surname: string;
  username: string;
  password?: string;
  email: string;
  photo: string;
  role?: Role;
  reading?: boolean;
  writing?: boolean;
  lastLogin?: string;
  sections?: any[];
}

export interface UserDAO {
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

export interface Section {
  id: number;
  name: string;
  url: string;
  status: boolean;
  module: {
    id: number;
    name: string;
  };
}
