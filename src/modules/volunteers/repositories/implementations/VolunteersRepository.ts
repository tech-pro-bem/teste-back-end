import mongoose, { ObjectId } from 'mongoose';
import { IVolunteersRepository } from '../IVolunteersRepository';
import { Voluntary } from '../../schemas/voluntary/Voluntary.schema';
import { IVolunteersDTO } from '../../dtos/IVolunteersDTO';
import { IVoluntarySchema } from '../../schemas/voluntary/IVoluntarySchema';

class VolunteersRepository implements IVolunteersRepository{
  private repository: mongoose.Model<IVoluntarySchema>;

  constructor() {
    this.repository = Voluntary
  }

  async create(data: IVolunteersDTO): Promise<void> {
    const voluntary = await this.repository.create(data);

    await voluntary.save();
  }
  
  async findByEmail(email: string): Promise<mongoose.Document<unknown, any, IVoluntarySchema>>{
    const voluntary = await this.repository.findOne({ email })
    return voluntary;
  }

  async update(data: IVolunteersDTO): Promise<void> {
    const voluntary = await this.findByEmail(data.email);
    await voluntary.updateOne(data);
  }

  async delete(id: ObjectId): Promise<void> {
    await this.repository.deleteOne({ _id: id });
  }

}

export { VolunteersRepository };
