import { middyfy } from "@libs/lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { dynamo } from "../../../database/DynamoDBClient";
import { BaseException } from "../../../utils/BaseException";
import { errorHandler } from "../../../utils/ErrorHandler";
import { loginAdminMiddleware } from "../../authentication/loginAdmin/LoginAdminMiddleware";

const deleteVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event
) => {
  const id = event.pathParameters["id"];

  const volunteerExists = await dynamo
    .query({
      TableName: "users",
      KeyConditionExpression: "id = :id AND sk = :sk",
      ExpressionAttributeValues: {
        ":id": id,
        ":sk": "volunteer",
      },
    })
    .promise();

  if (volunteerExists.Count == 0) {
    throw new BaseException("VolunteerNotFound", "Volunteer not found!", 404);
  }

  await dynamo
    .delete({ TableName: "users", Key: { id, sk: "volunteer" } })
    .promise();

  return formatJSONResponse(204, {});
};

export const handle = middyfy(deleteVolunteerHandler)
  .onError(errorHandler)
  .use(loginAdminMiddleware);
