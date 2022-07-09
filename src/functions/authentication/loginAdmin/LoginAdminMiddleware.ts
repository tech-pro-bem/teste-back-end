import { verify } from "jsonwebtoken";
import { generatePolicy } from "../../../utils/GeneratePolicy";
import { MiddlewareObj, MiddyfiedHandler } from "@middy/core";
import { formatJSONResponse } from "@libs/api-gateway";

export const loginAdminMiddleware: MiddlewareObj = {
  before: ({ event }) => {
    const authorizationHeader = event.headers["Authorization"];

    if (!authorizationHeader) {
      return formatJSONResponse(400, {});
    }

    const [, token] = authorizationHeader.split(" ");

    if (!token) {
      return formatJSONResponse(400, {});
    }

    try {
      //const decoded = verify(token, process.env.JWT_SECRET);

      return { hello: true };
    } catch (error) {
      return formatJSONResponse(400, {});
    }
  },
};
