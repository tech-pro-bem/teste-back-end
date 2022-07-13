import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "../../../../utils/ApiGateway";
import { BaseException } from "../../../../utils/BaseException";
import updateVolunteerSchema from "./UpdateVolunteerSchema";
import { middyfy } from "../../../../utils/Lambda";
import { errorHandler } from "../../../../utils/ErrorHandler";
import { VolunteerMapper } from "../../mappers/VolunteerMapper";
import { loginAdminMiddleware } from "@functions/authentication/loginAdmin/LoginAdminMiddleware";
import { diContainer } from "src/shared/container";
import { IVolunteersRepository } from "@volunteers/repositories/IVolunteersRepository";
import { Volunteer } from "@volunteers/entities/Volunteer";

const updateVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof updateVolunteerSchema
> = async (event) => {
  const id = event.pathParameters["id"];

  const repository = diContainer.resolve<IVolunteersRepository>(
    "OneTableVolunteersRepository"
  );

  const { fullName, phoneNumber, email, password } = event.body;

  const volunteerExists = await repository.findById(id);

  if (!volunteerExists) {
    throw new BaseException("VolunteerNotFound", "Volunteer not found!", 404);
  }

  const volunteerUpdated = await repository.update(
    new Volunteer({
      id,
      fullName,
      phoneNumber,
      email,
      password,
    })
  );

  return formatJSONResponse(200, VolunteerMapper.toMapper(volunteerUpdated));
};

export const handle = middyfy(updateVolunteerHandler)
  .onError(errorHandler)
  .use(loginAdminMiddleware);
