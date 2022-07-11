import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Volunteer_Token } from 'src/entities/Volunteer_Token'
import { AppError } from 'src/helpers/errors/AppError'
import { IDateProvider } from 'src/services/date-provider/IDateProvider'
import auth from 'src/utils/auth'

import { ICreateVolunteerTokenResponseDTO } from '../../dtos/ICreateVolunteerTokenResponseDTO'
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository'
import { IVolunteersTokensRepository } from '../../repositories/IVolunteersTokensRepository'

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateVolunteerUseCase {
  constructor (
    private volunteersRepository: IVolunteersRepository,
    private dateProvider: IDateProvider,
    private volunteersTokensRepository: IVolunteersTokensRepository
  ) {}

  async execute ({ email, password }:IRequest): Promise<ICreateVolunteerTokenResponseDTO> {
    const volunteer = await this.volunteersRepository.getOneVolunteer(email)

    if (!volunteer) {
      throw new AppError('Email or password is incorrect!')
    }

    const passwordMatch = await compare(password, volunteer.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const {
      expires_in_refresh_token,
      expires_in_token,
      expires_refresh_token_days,
      secret_refresh_token,
      secret_token
    } = auth

    const volunteerToken = await this.volunteersTokensRepository.findTokenByVolunteerId(volunteer.id)

    if (volunteerToken) {
      await this.volunteersTokensRepository.deleteVolunteerTokenById(volunteerToken.id)
    }

    const token = sign({}, secret_token, {
      subject: volunteer.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: volunteer.id,
      expiresIn: expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    const expires_date_milliseconds = this.dateProvider.convertToMillisecond(expires_date)

    const volunteerTokenCreate = Volunteer_Token.create({
      volunteer_id: volunteer.id,
      refresh_token,
      expires_date: expires_date_milliseconds
    })

    await this.volunteersTokensRepository.create(volunteerTokenCreate)

    const tokenReturn: ICreateVolunteerTokenResponseDTO = {
      volunteer: {
        name: volunteer.name,
        email: volunteer.email
      },
      token,
      refresh_token
    }

    return tokenReturn
  }
}

export { AuthenticateVolunteerUseCase }
