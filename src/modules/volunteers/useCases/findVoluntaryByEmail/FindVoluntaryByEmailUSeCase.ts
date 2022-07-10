import { inject, injectable } from 'tsyringe';
import { IVolunteersRepository } from '../../interfaces/IVolunteersRepository';
import mongoose from 'mongoose';
import { AppError } from '../../../../errors/AppError';

@injectable()
class FindVoluntaryByEmailUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(email: string): Promise<mongoose.Document<any>> {
    const voluntary = await this.volunteersRepository.findByEmail(email);
    if(!voluntary) {
      throw new AppError('Voluntary not Found!', 404);
    }
    return voluntary;
  }
}

export { FindVoluntaryByEmailUseCase }
