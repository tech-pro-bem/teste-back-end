import { middyfy } from "../../../../utils/Lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "../../../../utils/ApiGateway";
import { BaseException } from "../../../../utils/BaseException";
import { errorHandler } from "../../../../utils/ErrorHandler";
import { VolunteerMapper } from "../../mappers/VolunteerMapper";
import { loginAdminMiddleware } from "@functions/authentication/loginAdmin/LoginAdminMiddleware";
import { diContainer } from "src/shared/container";
import { IVolunteersRepository } from "@volunteers/repositories/IVolunteersRepository";

const findVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event
) => {
  const repository = diContainer.resolve<IVolunteersRepository>(
    "OneTableVolunteersRepository"
  );

  const id = event.pathParameters["id"];

  const volunteer = await repository.findById(id);

  if (!volunteer) {
    throw new BaseException("VolunteerNotFound", "Volunteer not found!", 404);
  }

  return formatJSONResponse(200, VolunteerMapper.toMapper(volunteer));
};

export const handle = middyfy(findVolunteerHandler)
  .onError(errorHandler)
  .use(loginAdminMiddleware);
