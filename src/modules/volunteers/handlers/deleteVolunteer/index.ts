import { handlerPath } from "../../../../utils/HandlerResolver";

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
