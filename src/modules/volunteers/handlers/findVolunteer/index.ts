import { handlerPath } from "../../../../utils/HandlerResolver";

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
