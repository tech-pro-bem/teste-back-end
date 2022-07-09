import { inject, injectable } from 'tsyringe';
import { IVolunteersRepository } from '../../interfaces/IVolunteersRepository';
import mongoose from 'mongoose';

@injectable()
class FindVoluntaryByEmailUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(email: string): Promise<mongoose.Document<any>> {
    const voluntary = await this.volunteersRepository.findByEmail(email);
    if(!voluntary) {
      throw new Error('Voluntary not Found!');
    }
    return voluntary;
  }
}

export { FindVoluntaryByEmailUseCase }
