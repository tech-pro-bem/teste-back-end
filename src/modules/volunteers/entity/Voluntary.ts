import { v4 as uuidv4 } from "uuid";

class Voluntary{

  readonly id?: string;
  readonly created_At?: Date;
  updated_At?: Date;
  email?: string;
  fullName?: string;
  birthdate?: Date;
  cellphone?: string;
  occupation?: string;
  university?: string;
  semester?: string;
  speciality?: string;
  listFreeDaysOfWeek?: Array<string>;
  numberOfFreeDaysOfWeek?: number;
  timeOfExperience?: string;
  howMuchParticipate?: number;
  howDidKnowOfSDR?: string;
  verifiedEmail? = false;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Voluntary };
