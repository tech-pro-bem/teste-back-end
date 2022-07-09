import { container } from "tsyringe";
import { VolunteersRepository } from "../../modules/volunteers/repositories/implementations/VolunteersRepository";
import { IVolunteersRepository } from "../../modules/volunteers/repositories/IVolunteersRepository";


container.registerSingleton<IVolunteersRepository>(
  'VolunteersRepository',
  VolunteersRepository
);