import { inject, injectable } from "tsyringe";
import { IRequest } from "../../interfaces/IRequest";
import { IVolunteersRepository } from "../../repositories/IVolunteersRepository";

@injectable()
class UpdateVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.findByEmail(data.email);

    if (!voluntaryAlreadyExists) {
      throw new Error('Voluntary Email not Found!');
    }

    await this.volunteersRepository.update(data);
  }
}

export { UpdateVoluntaryUseCase }
