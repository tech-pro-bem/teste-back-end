import { Optional } from "src/utils/TypesHelper";
import { v4 as uuidV4 } from "uuid";

export class Volunteer {
  constructor({
    email,
    fullName,
    password,
    phoneNumber,
    id,
  }: Optional<Volunteer, "id">) {
    const volunteer = this;

    Object.assign(volunteer, {
      email,
      id: id ? id : uuidV4(),
      fullName,
      password,
      phoneNumber,
    });
  }

  id: string;

  email: string;

  fullName: string;

  password: string;

  phoneNumber: string;
}
