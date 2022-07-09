import mongoose, { ObjectId } from 'mongoose';
import { IVolunteersRepository } from '../IVolunteersRepository';
import { VoluntaryModel } from '../../schemas/Voluntary.schema';
import { IVolunteersDTO } from '../../dtos/IVolunteersDTO';

class VolunteersRepository implements IVolunteersRepository{
  private repository: mongoose.Model<IVolunteersDTO>;

  constructor() {
    this.repository = VoluntaryModel
  }

  async create(data: IVolunteersDTO): Promise<void> {
    const voluntary = await this.repository.create(data);

    await voluntary.save();
  }
  async findByEmail(email: string): Promise<mongoose.Document<any>>{
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
