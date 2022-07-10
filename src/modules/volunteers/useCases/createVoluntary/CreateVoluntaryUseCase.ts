import { inject, injectable } from "tsyringe";
import { IVolunteersRepository } from "../../interfaces/IVolunteersRepository";
import { hash } from 'bcryptjs';
import { ICreateVoluntaryDTO } from "../../dtos/ICreateVoluntaryDTO";
import { AppError } from "../../../../errors/AppError";



@injectable()
class CreateVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(data: ICreateVoluntaryDTO ): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.findByEmail(data.email);

    if(voluntaryAlreadyExists) {
      throw new AppError('Already Exists!', 500);
    }

    data.password = await hash(data.password, 8);

    await this.volunteersRepository.create(data)
  }
}

export { CreateVoluntaryUseCase };
