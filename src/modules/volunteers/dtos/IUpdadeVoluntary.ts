import { IVoluntary } from "../interfaces/IVoluntary";

interface IUpdateVoluntaryDTO {
  email: IVoluntary['email'];
  name: IVoluntary['name'];
  password: IVoluntary['password'];
  birthdate: IVoluntary['birthdate'];
  cellphone: IVoluntary['cellphone'];
  occupation: IVoluntary['occupation'];
  university: IVoluntary['university'];
  semester: IVoluntary['semester'];
  speciality: IVoluntary['speciality'];
  listFreeDaysOfWeek: IVoluntary['listFreeDaysOfWeek'];
  numberOfFreeDaysOfWeek: IVoluntary['numberOfFreeDaysOfWeek'];
  timeOfExperience: IVoluntary['timeOfExperience'];
  howMuchParticipate: IVoluntary['howMuchParticipate'];
  howDidKnowOfSDR: IVoluntary['howDidKnowOfSDR'];
}

export { IUpdateVoluntaryDTO };
