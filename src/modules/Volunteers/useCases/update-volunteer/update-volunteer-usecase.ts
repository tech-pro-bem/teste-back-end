import { hash } from 'bcryptjs'
import { AppError } from 'src/helpers/errors/AppError'

import { IUpdateVolunteerRequestDTO } from '../../dtos/IUpdateVolunteerRequestDTO'
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository'

class UpdateVolunteerUseCase {
  constructor (private volunteersRepository: IVolunteersRepository) {}

  async execute (dataToUpdate: IUpdateVolunteerRequestDTO): Promise<void> {
    const volunteer = await this.volunteersRepository.getOneVolunteer(dataToUpdate.email)

    if (!volunteer) {
      throw new AppError('Does not exists a volunteer with this email!', 400)
    }

    dataToUpdate.newPassword = await hash(dataToUpdate.newPassword, 8)

    await this.volunteersRepository.updateVolunteer(dataToUpdate)
  }
}

export { UpdateVolunteerUseCase }
