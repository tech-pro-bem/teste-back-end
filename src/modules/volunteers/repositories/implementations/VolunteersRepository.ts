import mongoose from 'mongoose';
import { IVolunteersRepository } from '../IVolunteersRepository';
import { IVoluntary, VoluntaryModel } from '../../schemas/Voluntary.schema';
import { IVolunteersDTO } from '../../dtos/IVolunteersDTO';

class VolunteersRepository implements IVolunteersRepository{
  private repository: mongoose.Model<IVoluntary>

  constructor() {
    this.repository = VoluntaryModel
  }

  async create({ name, email }: IVolunteersDTO): Promise<void> {
    const voluntary = await this.repository.create({
      name,
      email,
    })

    await voluntary.save();
  }
  async list(email: string): Promise<mongoose.Document>{
    const voluntary = await this.repository.findOne({ email })
    return voluntary;
  }
  update({ name, email }: IVolunteersDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}

export { VolunteersRepository };
