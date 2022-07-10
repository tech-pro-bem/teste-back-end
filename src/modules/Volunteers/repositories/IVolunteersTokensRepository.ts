import { Volunteer_Token } from 'src/entities/Volunteer_Token'

interface IVolunteersTokensRepository {
  create(data: Volunteer_Token): Promise<void>;

  deleteVolunteerTokenById(id: string): Promise<void>;

  findTokenByVolunteerId(volunteer_id: string): Promise<Volunteer_Token>;

  findByRefreshToken(refresh_token: string): Promise<Volunteer_Token>;

  findByVolunteerAndRefreshToken(
    volunteer_id: string,
    refresh_token: string,
  ): Promise<Volunteer_Token>;
}

export { IVolunteersTokensRepository }
