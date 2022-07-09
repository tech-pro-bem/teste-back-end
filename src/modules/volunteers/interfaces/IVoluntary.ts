import { Document, ObjectId } from "mongoose";

interface IVoluntary extends Document{
  id?: ObjectId;
  admin?: boolean;
  created_at: Date;
  updated_at?: Date;
  email: string;
  name: string;
  birthdate: string;
  cellphone: string;
  occupation: string;
  university: string;
  semester: string;
  speciality: string;
  listFreeDaysOfWeek: Array<string>;
  numberOfFreeDaysOfWeek: number;
  timeOfExperience: string;
  howMuchParticipate: string;
  howDidKnowOfSDR: string;
  password?: string;
}

export { IVoluntary };
