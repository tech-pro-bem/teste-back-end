import { verify } from "jsonwebtoken";
import { MiddlewareObj } from "@middy/core";
import { formatJSONResponse } from "../../../utils/ApiGateway";

export interface IUserAuth {
  email: string;
  sub: string;
}

export const loginAdminMiddleware: MiddlewareObj = {
  before: ({ event }) => {
    const authorizationHeader = event.headers["authorization"];

    if (!authorizationHeader) {
      return formatJSONResponse(401, {
        errorName: "MissingAuthHeader",
        message: "Authorization failed",
      });
    }

    const [, token] = authorizationHeader.split(" ");

    if (!token) {
      return formatJSONResponse(401, {
        errorName: "MissingToken",
        message: "Authorization failed",
      });
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET) as IUserAuth;

      event.user = { email: decoded.email, sub: decoded.sub };
    } catch (error) {
      return formatJSONResponse(400, {
        errorName: "InvalidToken",
        message: "Authorization expired",
      });
    }
  },
};
