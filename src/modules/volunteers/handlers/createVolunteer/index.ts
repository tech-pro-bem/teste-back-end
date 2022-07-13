import { handlerPath } from "../../../../utils/HandlerResolver";
import schema from "./CreateVolunteerSchema";

export default {
  handler: `${handlerPath(__dirname)}/CreateVolunteerHandler.handle`,
  events: [
    {
      http: {
        method: "post",
        path: "volunteers",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
