import { middyfy } from "@libs/lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { dynamo } from "../../../database/DynamoDBClient";
import { BaseException } from "../../../utils/BaseException";
import { errorHandler } from "../../../utils/ErrorHandler";
import { IVolunteer, VolunteerMapper } from "../../../mappers/VolunteerMapper";

const findVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event
) => {
  const id = event.pathParameters["id"];

  const volunteer = await dynamo
    .query({
      TableName: "users",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  if (volunteer.Count == 0) {
    throw new BaseException("VolunteerNotFound", "Volunteer not found!", 404);
  }

  return formatJSONResponse(
    200,
    VolunteerMapper.toMapper(volunteer.Items[0] as IVolunteer)
  );
};

export const handle = middyfy(findVolunteerHandler).onError(errorHandler);
