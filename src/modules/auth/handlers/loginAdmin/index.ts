import { handlerPath } from "../../../../utils/HandlerResolver";
import schema from "@auth/handlers/loginAdmin/LoginAdminSchema";

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
