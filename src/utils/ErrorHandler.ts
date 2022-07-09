import { BaseException } from "./BaseException";
import { formatJSONResponse } from "@libs/api-gateway";

export function errorHandler({ error }) {
  if (error instanceof BaseException) {
    return formatJSONResponse(error.statusCode, {
      errorName: error.name,
      message: error.message,
    });
  }

  // Sentry would be useful for this
  console.log(error);
  return formatJSONResponse(500, {
    errorName: "InternalServerError",
    message: "Internal Server Error",
  });
}
