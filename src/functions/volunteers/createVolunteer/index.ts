import { handlerPath } from "@libs/handler-resolver";
import schema from "@functions/volunteers/createVolunteer/CreateVolunteerSchema";

export default {
    handler: `${handlerPath(__dirname)}/CreateVolunteerHandler.handle`,
    events: [
        {
            http: {
                method: 'post',
                path: 'volunteers',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            },
        },
    ],
};
