import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 as uuidV4 } from "uuid";
import schema from "@functions/volunteers/createVolunteer/CreateVolunteerSchema";
import { dynamo } from "../../../database/DynamoDBClient";
import { hash } from "bcryptjs";
import { BaseException } from "../../../utils/BaseException";
import { errorHandler } from "../../../utils/ErrorHandler";
import { VolunteerMapper } from "../../../mappers/VolunteerMapper";
import { loginAdminMiddleware } from "@functions/authentication/loginAdmin/LoginAdminMiddleware";

const createVolunteerHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { phoneNumber, fullName, email, password } = event.body;

  const volunteerExists = await dynamo
    .query({
      TableName: "users",
      IndexName: "email_index",
      FilterExpression: "sk = :sk",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
        ":sk": "volunteer",
      },
    })
    .promise();

  if (volunteerExists.Count > 0) {
    throw new BaseException("VolunteerExists", "Volunteer already exists!");
  }

  const volunteerItem = {
    id: uuidV4(),
    email,
    fullName,
    password: await hash(password, 8),
    sk: "volunteer",
    phoneNumber,
  };

  await dynamo
    .put({
      TableName: "users",
      Item: {
        ...volunteerItem,
      },
    })
    .promise();

  return formatJSONResponse(201, VolunteerMapper.toMapper(volunteerItem));
};

export const handle = middyfy(createVolunteerHandler)
  .onError(errorHandler)
  .use(loginAdminMiddleware);
