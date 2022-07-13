import "reflect-metadata";
import { IAdminsRepository } from "src/modules/admins/repositories/IAdminsRepository";
import { OneTableAdminsRepository } from "src/modules/admins/repositories/onetable/OneTableAdminsRepository";
import { container } from "tsyringe";
import { IVolunteersRepository } from "../../modules/volunteers/repositories/IVolunteersRepository";
import { OneTableVolunteersRepository } from "../../modules/volunteers/repositories/onetable/OneTableVolunteersRepository";

container.registerSingleton<IVolunteersRepository>(
  "OneTableVolunteersRepository",
  OneTableVolunteersRepository
);

container.registerSingleton<IAdminsRepository>(
  "OneTableAdminsRepository",
  OneTableAdminsRepository
);

export const diContainer = container;
