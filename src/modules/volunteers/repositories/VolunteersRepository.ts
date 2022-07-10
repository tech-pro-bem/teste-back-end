import mongoose, { Document, ObjectId } from 'mongoose';
import { IVolunteersRepository } from '../interfaces/IVolunteersRepository';
import { Voluntary } from '../schemas/voluntary/Voluntary.schema';
import { IVolunteersDTO } from '../dtos/IVolunteersDTO';
import { IVoluntary} from '../interfaces/IVoluntary';

class VolunteersRepository implements IVolunteersRepository{
  private repository: mongoose.Model<IVoluntary>;

  constructor() {
    this.repository = Voluntary
  }

  async create(data: IVolunteersDTO): Promise<void> {
    const voluntary = await this.repository.create(data);

    await voluntary.save();
  }

  async findByEmail(email: IVoluntary['email']): Promise<IVoluntary>{
    const voluntary = await this.repository.findOne({ email })
    return voluntary;
  }

  async update(data: IVolunteersDTO): Promise<void> {
    const voluntary = await this.findByEmail(data.email);
    await voluntary.updateOne({ data , updated_at: Date.now()});
  }

  async delete(id: IVoluntary['id']): Promise<void> {
    await this.repository.deleteOne({ _id: id });
  }

  async findById(id: string): Promise<IVoluntary> {
    const voluntary = await this.repository.findById(id);
    return voluntary;
  }
}

export { VolunteersRepository };
