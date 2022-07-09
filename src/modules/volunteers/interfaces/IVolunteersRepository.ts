import { IVolunteersDTO } from '../dtos/IVolunteersDTO';
import mongoose, { ObjectId } from 'mongoose';
import { IVoluntary } from './IVoluntary';

interface IVolunteersRepository {
  create(data: IVolunteersDTO): Promise<void>;
  findByEmail(email: IVoluntary['email']): Promise<IVoluntary>;
  update({ name, email }: IVolunteersDTO): Promise<void>;
  delete(id: IVoluntary['id']): Promise<void>
}

export { IVolunteersRepository };
