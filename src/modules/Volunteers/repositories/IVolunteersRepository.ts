import { Volunteer } from 'src/entities/Volunteer'

import { IUpdateVolunteerRequestDTO } from '../dtos/IUpdateVolunteerRequestDTO'

interface IVolunteersRepository {
  create(data: Volunteer): Promise<void>;
  checkIfVolunteerExistsByEmail(email: string): Promise<boolean>;
  getOneVolunteer(emailToSearch: string): Promise<Volunteer>;
  updateVolunteer(dataToUpdate: IUpdateVolunteerRequestDTO): Promise<void>;
  deleteVolunteer(email: string): Promise<void>
}

export { IVolunteersRepository }
