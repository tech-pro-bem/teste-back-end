import { middyfy } from "../../../../utils/Lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "../../../../utils/ApiGateway";
import { BaseException } from "../../../../utils/BaseException";
import { errorHandler } from "../../../../utils/ErrorHandler";
import { loginAdminMiddleware } from "@functions/authentication/loginAdmin/LoginAdminMiddleware";
import { diContainer } from "src/shared/container";
import { IVolunteersRepository } from "@volunteers/repositories/IVolunteersRepository";

const deleteVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event
) => {
  const repository = diContainer.resolve<IVolunteersRepository>(
    "OneTableVolunteersRepository"
  );

  const id = event.pathParameters["id"];

  const volunteerExists = await repository.findById(id);

  if (!volunteerExists) {
    throw new BaseException("VolunteerNotFound", "Volunteer not found!", 404);
  }

  await repository.delete(id);

  return formatJSONResponse(204);
};

export const handle = middyfy(deleteVolunteerHandler)
  .onError(errorHandler)
  .use(loginAdminMiddleware);
