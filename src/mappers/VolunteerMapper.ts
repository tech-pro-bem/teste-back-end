export interface IVolunteer {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  sk: string;
}

export class VolunteerMapper {
  static toMapper({ id, email, phoneNumber, fullName }: IVolunteer) {
    return { id, email, phoneNumber, fullName };
  }
}
