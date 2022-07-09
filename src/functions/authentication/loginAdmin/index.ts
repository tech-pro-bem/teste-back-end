import { handlerPath } from "@libs/handler-resolver";
import schema from "@functions/authentication/loginAdmin/LoginAdminSchema";

export default {
  handler: `${handlerPath(__dirname)}/LoginAdminHandler.handle`,
  events: [
    {
      http: {
        method: "post",
        path: "auth/admin/login",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
