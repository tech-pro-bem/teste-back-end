import mongoose from "mongoose";

interface IVolunteers {

  email?: string;
  name?: string;
  /*birthdate?: Date;
  cellphone?: string;
  occupation?: string;
  university?: string;
  semester?: string;
  speciality?: string;
  listFreeDaysOfWeek?: Array<string>;
  numberOfFreeDaysOfWeek?: number;
  timeOfExperience?: string;
  howMuchParticipate?: number;
  howDidKnowOfSDR?: string;*/
}

export default interface IVolunteersSI extends IVolunteers, mongoose.Document {};
