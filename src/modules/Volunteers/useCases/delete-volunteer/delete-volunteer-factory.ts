import { VolunteersRepository } from '../../infra/dynamodb/repositories/volunteers-repository'
import { DeleteVolunteerUseCase } from './delete-volunteer-usecase'

const volunteersRepository = new VolunteersRepository()

const deleteVolunteerUseCase = new DeleteVolunteerUseCase(volunteersRepository)

export { deleteVolunteerUseCase }
