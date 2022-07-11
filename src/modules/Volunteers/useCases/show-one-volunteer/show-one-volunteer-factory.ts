import { VolunteersRepository } from '../../infra/dynamodb/repositories/volunteers-repository'
import { ShowOneVolunteerUseCase } from './show-one-volunteer-usecase'

const volunteersRepository = new VolunteersRepository()

const showOneVolunteerUseCase = new ShowOneVolunteerUseCase(volunteersRepository)

export { showOneVolunteerUseCase }
