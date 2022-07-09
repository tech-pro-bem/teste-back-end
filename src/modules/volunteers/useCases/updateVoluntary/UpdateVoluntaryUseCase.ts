import { inject, injectable } from "tsyringe";
import { IUpdateVoluntaryDTO } from "../../dtos/IUpdadeVoluntary";
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
      throw new Error('Voluntary Email not Found!');
    }

    await this.volunteersRepository.update(data);
  }
}

export { UpdateVoluntaryUseCase }
