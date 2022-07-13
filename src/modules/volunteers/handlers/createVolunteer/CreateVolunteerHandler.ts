import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "../../../../utils/ApiGateway";
import { middyfy } from "../../../../utils/Lambda";
import schema from "./CreateVolunteerSchema";
import { hash } from "bcryptjs";
import { BaseException } from "../../../../utils/BaseException";
import { errorHandler } from "../../../../utils/ErrorHandler";
import { VolunteerMapper } from "../../mappers/VolunteerMapper";
import { loginAdminMiddleware } from "@functions/authentication/loginAdmin/LoginAdminMiddleware";
import { Volunteer } from "../../entities/Volunteer";
import { diContainer } from "../../../../shared/container";
import { IVolunteersRepository } from "../../repositories/IVolunteersRepository";

const createVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const repository = diContainer.resolve<IVolunteersRepository>(
    "OneTableVolunteersRepository"
  );

  const { phoneNumber, fullName, email, password } = event.body;

  const volunteerExists = await repository.findByEmail(email);

  if (volunteerExists) {
    throw new BaseException("VolunteerExists", "Volunteer already exists!");
  }

  const volunteer = await repository.create(
    new Volunteer({
      email,
      fullName,
      password: await hash(password, 8),
      phoneNumber,
    })
  );

  return formatJSONResponse(201, VolunteerMapper.toMapper(volunteer));
};

export const handle = middyfy(createVolunteerHandler)
  .onError(errorHandler)
  .use(loginAdminMiddleware);
