import { hash } from 'bcryptjs'
import { AppError } from 'src/helpers/errors/AppError'

import { Volunteer } from '../../../../entities/Volunteer'
import { ICreateVolunteerRequestDTO } from '../../dtos/ICreateVolunteerRequestDTO'
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository'

class CreateVolunteerUseCase {
  constructor (private volunteersRepository: IVolunteersRepository) {}

  async execute ({ name, email, password }: ICreateVolunteerRequestDTO): Promise<void> {
    const volunteerAlreadyExists = await this.volunteersRepository.checkIfVolunteerExistsByEmail(email)

    if (volunteerAlreadyExists) {
      throw new AppError('Volunteer already exists!', 400)
    }

    const passwordHash = await hash(password, 8)

    const volunteerCreate = Volunteer.create({ email, name, password: passwordHash })
    await this.volunteersRepository.create(volunteerCreate)
  }
}

export { CreateVolunteerUseCase }
