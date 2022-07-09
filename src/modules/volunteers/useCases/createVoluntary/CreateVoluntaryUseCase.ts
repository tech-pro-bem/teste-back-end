import { inject, injectable } from "tsyringe";
import { IRequest } from "../../interfaces/IRequest";
import { IVolunteersRepository } from "../../repositories/IVolunteersRepository";

@injectable()
class CreateVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.findByEmail(data.email);

    if(voluntaryAlreadyExists) {
      throw new Error('Already Exists!');
    }

    await this.volunteersRepository.create(data)
  }
}

export { CreateVoluntaryUseCase };
