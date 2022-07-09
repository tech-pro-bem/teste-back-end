import mongoose, { Schema , model} from 'mongoose';
import { Voluntary } from '../entity/Voluntary';

interface IVoluntary {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  name: string;
}

const VoluntarySchema = new Schema<IVoluntary>({
  id: String,
  created_at: Date,
  updated_at: Date,
  email: String,
  name: {
    type: String,
     required:false
  },
  birthdate: {
    type: Date,
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
    type: Array,
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
VoluntarySchema.loadClass(Voluntary)
const VoluntaryModel = model<IVoluntary>('voluntary', VoluntarySchema);
export { VoluntaryModel, IVoluntary };
