import { IVolunteersDTO } from '../dtos/IVolunteersDTO';
import mongoose, { ObjectId } from 'mongoose';
import { IVoluntarySchema } from '../schemas/voluntary/IVoluntarySchema';

interface IVolunteersRepository {
  create(data: IVolunteersDTO): Promise<void>;
  findByEmail(email: string): Promise<mongoose.Document<unknown, any, IVoluntarySchema>>;
  update({ name, email }: IVolunteersDTO): Promise<void>;
  delete(id: ObjectId): Promise<void>
}

export { IVolunteersRepository };
