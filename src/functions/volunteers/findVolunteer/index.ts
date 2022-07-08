import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindVolunteerHandler.handle`,
  events: [
    {
      http: {
        method: "get",
        path: "volunteers/{id}",
      },
    },
  ],
};
