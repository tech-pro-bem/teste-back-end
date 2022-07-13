import { Optional } from "src/utils/TypesHelper";
import { v4 as uuidV4 } from "uuid";

export class Admin {
  constructor({ id, email, password }: Optional<Admin, "id">) {
    const admin = this;

    Object.assign(admin, { id: id ? id : uuidV4(), email, password });
  }

  id: string;

  email: string;

  password: string;
}
