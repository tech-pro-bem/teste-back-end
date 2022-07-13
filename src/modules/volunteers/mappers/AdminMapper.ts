import { Admin } from "../../admins/entities/Admin";

export class AdminMapper {
  static toMapper({ email, id }: Admin) {
    return { id, email };
  }
}
