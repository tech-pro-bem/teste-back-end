import { AppError } from 'src/helpers/errors/AppError'

import { IVolunteersRepository } from '../../repositories/IVolunteersRepository'

class DeleteVolunteerUseCase {
  constructor (private volunteersRepository: IVolunteersRepository) {}

  async execute (email: string): Promise<void> {
    const volunteerExists = await this.volunteersRepository.checkIfVolunteerExistsByEmail(email)

    if (!volunteerExists) {
      throw new AppError('Does not exists a volunteer with this email!', 400)
    }

    await this.volunteersRepository.deleteVolunteer(email)
  }
}

export { DeleteVolunteerUseCase }
