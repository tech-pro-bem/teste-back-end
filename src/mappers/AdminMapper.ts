export interface IAdmin {
  email: string;
  password: string;
}

export class AdminMapper {
  static toMapper({ email }: IAdmin) {
    return { email };
  }
}
