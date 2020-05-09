import { User } from "./userModel";

export class UserRepository extends User {
  constructor() {
    super();
  }

  public async add(user: User) {
    await this.pool.query("INSERT INTO user SET ?", user);
  }

  public async update(user: User, id: number) {
    await this.pool.query(`UPDATE user SET ? WHERE id = ${id}`, { ...user });
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
      value
    ]);
    let user = new User();
    user = { ...result[0] };
    return user;
  }

  public async byId(id: number) {
    const result = await this.pool.query("SELECT * FROM user WHERE id = ?", [
      id
    ]);
    let user = new User();
    user = { ...result[0] };
    return user;
  }

  private delete(user: User) {}
}
