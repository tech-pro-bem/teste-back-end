import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IVolunteersRepository } from "../../interfaces/IVolunteersRepository";

@injectable()
class DeleteVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(email: string): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.findByEmail(email);
    if (!voluntaryAlreadyExists) {
      throw new AppError('Voluntary Not Exists!', 404);
    }

    await this.volunteersRepository.delete(voluntaryAlreadyExists._id)
  }
}

export { DeleteVoluntaryUseCase }
