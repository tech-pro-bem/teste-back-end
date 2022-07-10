import { DayjsDateProvider } from 'src/services/date-provider/implementations/DayjsDateProvider'

import { VolunteersRepository } from '../../infra/dynamodb/repositories/volunteers-repository'
import { VolunteersTokensRepository } from '../../infra/dynamodb/repositories/volunteers-tokens-repository'
import { AuthenticateVolunteerUseCase } from './authenticate-volunteer-usecase'

const volunteersRepository = new VolunteersRepository()

const dateProvider = new DayjsDateProvider()

const volunteersTokensRepository = new VolunteersTokensRepository()

const authenticateVolunteerUseCase = new AuthenticateVolunteerUseCase(volunteersRepository, dateProvider, volunteersTokensRepository)

export { authenticateVolunteerUseCase }
