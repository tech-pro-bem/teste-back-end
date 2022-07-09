import { IVolunteersDTO } from '../dtos/IVolunteersDTO';
import { Voluntary } from '../entity/Voluntary';
import { IVoluntary } from '../schemas/Voluntary.schema';
import mongoose from 'mongoose';

interface IVolunteersRepository {
  create({ name, email }: IVolunteersDTO): Promise<void>;
  list(email: string): Promise<mongoose.Document<IVoluntary>>;
  update({ name, email }: IVolunteersDTO): Promise<void>;
  delete(): Promise<void>
}

export { IVolunteersRepository };
