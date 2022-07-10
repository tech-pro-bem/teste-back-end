import { VolunteersRepository } from '../../infra/dynamodb/repositories/volunteers-repository'
import { UpdateVolunteerUseCase } from './update-volunteer-usecase'

const volunteersRepository = new VolunteersRepository()

const updateVolunteerUseCase = new UpdateVolunteerUseCase(volunteersRepository)

export { updateVolunteerUseCase }
