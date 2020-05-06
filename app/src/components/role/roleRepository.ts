import { Repository } from "./../../model/Repository";
import { Role } from "./roleModel";

export class RoleRepository extends Repository {
  constructor() {
    super();
  }

  public async findOneOrFail({ field, value }) {
    const result = await this.pool.query("SELECT * FROM role WHERE ?? = ?", [
      field,
      value,
    ]);
    let role = new Role();
    role = { ...result[0] };
    return role;
  }

  // public async byId(id: number) {
  //   const result = await this.pool.query("SELECT * FROM user WHERE id = ?", [
  //     id,
  //   ]);
  //   let user = new User();
  //   user = { ...result[0] };
  //   return user;
  // }

  // public create(user: User) {
  //   // this.query("INSERT INTO users SET ?", { user });
  // }

  // public update(user: User) {}
  // private delete(user: User) {}
}
