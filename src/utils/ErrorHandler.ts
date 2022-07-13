import { BaseException } from "./BaseException";
import { formatJSONResponse } from "./ApiGateway";

export function errorHandler({ error }) {
  if (error instanceof BaseException) {
    return formatJSONResponse(error.statusCode, {
      errorName: error.name,
      message: error.message,
    });
  }

  console.log(error);
  return formatJSONResponse(500, {
    errorName: "InternalServerError",
    message: "Internal Server Error",
  });
}
