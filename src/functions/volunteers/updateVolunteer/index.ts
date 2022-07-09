import { handlerPath } from "@libs/handler-resolver";
import schema from "@functions/volunteers/updateVolunteer/UpdateVolunteerSchema";

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
