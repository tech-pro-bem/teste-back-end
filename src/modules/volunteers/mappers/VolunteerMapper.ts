import { Volunteer } from "../entities/Volunteer";

export class VolunteerMapper {
  static toMapper({ id, email, phoneNumber, fullName }: Volunteer) {
    return { id, email, phoneNumber, fullName };
  }
}
