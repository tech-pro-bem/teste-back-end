import { VolunteersRepository } from '../../infra/dynamodb/repositories/volunteers-repository'
import { CreateVolunteerUseCase } from './create-volunteer-usecase'

const volunteersRepository = new VolunteersRepository()

const createVolunteerUseCase = new CreateVolunteerUseCase(volunteersRepository)

export { createVolunteerUseCase }
