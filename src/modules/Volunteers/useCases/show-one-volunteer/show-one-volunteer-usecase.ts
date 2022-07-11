import { Volunteer } from 'src/entities/Volunteer'
import { AppError } from 'src/helpers/errors/AppError'

import { IVolunteersRepository } from '../../repositories/IVolunteersRepository'

class ShowOneVolunteerUseCase {
  constructor (private volunteersRepository: IVolunteersRepository) {}

  async execute (email: string): Promise<Volunteer> {
    const volunteer = await this.volunteersRepository.getOneVolunteer(email)

    if (!volunteer) {
      throw new AppError('Does not exists a volunteer with this email!', 400)
    }

    return volunteer
  }
}

export { ShowOneVolunteerUseCase }
