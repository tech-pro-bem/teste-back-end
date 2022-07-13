import { Admin } from "../entities/Admin";

export interface IAdminsRepository {
  findById(id: string): Promise<Admin>;
  findByEmail(email: string): Promise<Admin>;
}
