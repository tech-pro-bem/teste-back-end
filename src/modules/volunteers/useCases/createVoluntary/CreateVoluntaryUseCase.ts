import { inject, injectable } from "tsyringe";
import { IVolunteersRepository } from "../../repositories/IVolunteersRepository";

interface IRequest {
  name: string;
  email: string;
}


@injectable()
class CreateVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute({ name, email }: IRequest): Promise<void> {
    const voluntaryAlreadyExists = await this.volunteersRepository.list(email);

    if(voluntaryAlreadyExists) {
      throw new Error('Already Exists!');
    }

    await this.volunteersRepository.create({
      name,
      email,
    })
  }
}

export { CreateVoluntaryUseCase };
