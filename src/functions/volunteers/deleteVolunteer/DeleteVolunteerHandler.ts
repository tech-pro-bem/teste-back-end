import { middyfy } from "@libs/lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { dynamo } from "../../../database/DynamoDBClient";
import { BaseException } from "../../../utils/BaseException";
import { errorHandler } from "../../../utils/ErrorHandler";

const deleteVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event
) => {
  const id = event.pathParameters["id"];

  const volunteerExists = await dynamo
    .query({
      TableName: "users",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  if (volunteerExists.Count == 0) {
    throw new BaseException("VolunteerNotFound", "Volunteer not found!", 404);
  }

  await dynamo.delete({ TableName: "users", Key: { id } }).promise();

  return formatJSONResponse(204, {});
};

export const handle = middyfy(deleteVolunteerHandler).onError(errorHandler);
