import { handlerPath } from "../../../../utils/HandlerResolver";
import schema from "./UpdateVolunteerSchema";

export default {
  handler: `${handlerPath(__dirname)}/UpdateVolunteerHandler.handle`,
  events: [
    {
      http: {
        method: "put",
        path: "volunteers/{id}",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
