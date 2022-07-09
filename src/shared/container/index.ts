import { container } from "tsyringe";
import { VolunteersRepository } from "../../modules/volunteers/repositories/VolunteersRepository";
import { IVolunteersRepository } from "../../modules/volunteers/interfaces/IVolunteersRepository";


container.registerSingleton<IVolunteersRepository>(
  'VolunteersRepository',
  VolunteersRepository
);