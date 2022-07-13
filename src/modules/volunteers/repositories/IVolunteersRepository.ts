import { Volunteer } from "../entities/Volunteer";

export interface IVolunteersRepository {
  findByEmail(email: string): Promise<Volunteer>;
  create(volunteer: Volunteer): Promise<Volunteer>;
  findById(id: string): Promise<Volunteer>;
  delete(id: string): Promise<void>;
  update(updatedVolunteer: Partial<Volunteer>): Promise<Volunteer>;
}
