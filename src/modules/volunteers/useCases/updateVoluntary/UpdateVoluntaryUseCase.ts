import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUpdateVoluntaryDTO } from "../../dtos/IUpdadeVoluntaryDTO";
import { IVolunteersRepository } from "../../interfaces/IVolunteersRepository";

@injectable()
class UpdateVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(data: IUpdateVoluntaryDTO): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.findByEmail(data.email);

    if (!voluntaryAlreadyExists) {
      throw new AppError('Voluntary Email not Found!', 404);
    }

    await this.volunteersRepository.update(data);
  }
}

export { UpdateVoluntaryUseCase }
