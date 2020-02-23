import { User } from "./userModel";
import { Repository } from "./../../model/Repository";

export class UserRepository extends Repository {
  constructor() {
    super();
  }

  public byId(id: number) {
    this.query("SELECT * FROM users WHERE id = ?", [id], function(err, result) {
      let user = new User();
      user = { ...result };
      return user;
    });
  }

  public create(user: User) {
    this.query("INSERT INTO users SET ?", { user });
  }

  public update(user: User) {}
  private delete(user: User) {}
}
