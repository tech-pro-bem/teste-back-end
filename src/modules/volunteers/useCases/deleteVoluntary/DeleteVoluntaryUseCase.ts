import { inject, injectable } from "tsyringe";
import { IVolunteersRepository } from "../../repositories/IVolunteersRepository";

@injectable()
class DeleteVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(email: string): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.findByEmail(email);
    if (!voluntaryAlreadyExists) {
      throw new Error('Voluntary Not Exists!');
    }

    await this.volunteersRepository.delete(voluntaryAlreadyExists._id)
  }
}

export { DeleteVoluntaryUseCase }
