import { IVolunteersDTO } from '../dtos/IVolunteersDTO';
import mongoose, { ObjectId } from 'mongoose';

interface IVolunteersRepository {
  create(data: IVolunteersDTO): Promise<void>;
  findByEmail(email: string): Promise<mongoose.Document<any>>;
  update({ name, email }: IVolunteersDTO): Promise<void>;
  delete(id: ObjectId): Promise<void>
}

export { IVolunteersRepository };
