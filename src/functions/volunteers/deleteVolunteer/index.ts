import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/DeleteVolunteerHandler.handle`,
  events: [
    {
      http: {
        method: "delete",
        path: "volunteers/{id}",
      },
    },
  ],
};
