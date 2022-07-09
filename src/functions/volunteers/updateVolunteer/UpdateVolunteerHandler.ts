import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { dynamo } from "../../../database/DynamoDBClient";
import { BaseException } from "../../../utils/BaseException";
import updateVolunteerSchema from "@functions/volunteers/updateVolunteer/UpdateVolunteerSchema";
import { middyfy } from "@libs/lambda";
import { dynamicQueryItemUpdate } from "../../../utils/DynamicQueryItemUpdate";
import { errorHandler } from "../../../utils/ErrorHandler";

const updateVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof updateVolunteerSchema
> = async (event) => {
  const id = event.pathParameters["id"];
  const { fullName, phoneNumber, email } = event.body;

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

  const query = dynamicQueryItemUpdate({
    ...(phoneNumber && { phoneNumber }),
    ...(email && { email }),
    ...(fullName && { fullName }),
  });

  const volunteerUpdated = await dynamo
    .update({
      TableName: "users",
      Key: { id },
      ...query,
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return formatJSONResponse(200, { ...volunteerUpdated.Attributes });
};

export const handle = middyfy(updateVolunteerHandler).onError(errorHandler);
