import { middyfy } from "@libs/lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import loginAdminSchema from "@functions/authentication/loginAdmin/LoginAdminSchema";
import { errorHandler } from "../../../utils/ErrorHandler";
import { dynamo } from "../../../database/DynamoDBClient";
import { BaseException } from "../../../utils/BaseException";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AdminMapper, IAdmin } from "../../../mappers/AdminMapper";

const loginAdminHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof loginAdminSchema
> = async (event) => {
  const { password, email } = event.body;

  const adminExists = await dynamo
    .query({
      TableName: "users",
      IndexName: "email_index",
      FilterExpression: "sk = :sk",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
        ":sk": "admin",
      },
    })
    .promise();

  if (adminExists.Count == 0) {
    throw new BaseException(
      "EmailOrPasswordInvalid",
      "The email or password is invalid!",
      401
    );
  }

  const passwordMatch = await compare(password, adminExists.Items[0].password);

  if (!passwordMatch) {
    throw new BaseException(
      "EmailOrPasswordInvalid",
      "The email or password is invalid!",
      401
    );
  }

  const token = sign(
    { email: adminExists.Items[0].email },
    process.env.JWT_SECRET,
    { subject: adminExists.Items[0].id }
  );

  return formatJSONResponse(200, {
    token,
    user: AdminMapper.toMapper(adminExists.Items[0] as IAdmin),
  });
};

export const handle = middyfy(loginAdminHandler).onError(errorHandler);
