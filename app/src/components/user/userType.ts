export interface Payload {
  id: number;
  username: string;
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
