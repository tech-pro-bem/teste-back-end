import mongoose, { Schema , model} from 'mongoose';
import { IVoluntaryModel } from '../interfaces/IVoluntaryModel';


const VoluntarySchema = new Schema<IVoluntaryModel>({
  id: {
    type: String,
    required: false
  },
  created_at: {
    type: Date
  },
  updated_at: Date,
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
     required:false
  },
  birthdate: {
    type: String,
    required: true
  },
  cellphone: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  listFreeDaysOfWeek: {
    type: [String],
    required: true
  },
  numberOfFreeDaysOfWeek: {
    type: Number,
    required: true
  },
  timeOfExperience: {
    type: String,
    required: true
  },
  howMuchParticipate: {
    type: String,
    required: true
  },
  howDidKnowOfSDR: {
    type: String,
    required: true
  },
})

const VoluntaryModel = model<IVoluntaryModel>('voluntary', VoluntarySchema);
export { VoluntaryModel };
