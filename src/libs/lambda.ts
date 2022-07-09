import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { loginAdminMiddleware } from "@functions/authentication/loginAdmin/LoginAdminMiddleware";

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(loginAdminMiddleware);
};
