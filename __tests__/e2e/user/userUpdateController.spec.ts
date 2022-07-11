import request from "supertest";
import { Server } from "http";
import { UserDeleteService } from "../../../src/service/user/UserDeleteService";
import { _server } from "../../_server";
import { userFactory } from "../../utils/userFactory";
import { URL_TEST } from "../../utils";
import { UserInterface } from "../../../src/types/userTypes";

describe("[e2e] - userUpdateController", () => {
    let app: Server;

    let userDeleteService: UserDeleteService;
    let userToBeUpdate: UserInterface;

    beforeAll(async () => {
        app = _server.listen(8033);

        userDeleteService = new UserDeleteService;
        const create = new userFactory().create()
        const createUser = await request(app).post(URL_TEST.POST_CREATE_USER).send(create)

        userToBeUpdate = await createUser.body;
    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });

    it("should auth and update user", async () => {
        const sign_in = await request(app).post(URL_TEST.POST_SIGN_IN).send(userToBeUpdate);

        const preUpdate = new userFactory().createAndUpdate(sign_in.body, sign_in.body.token)

        const afterUpdate = await request(app).put(URL_TEST.PUT_FIND_BY_ID_AND_UPDATE).send(preUpdate);


        expect(afterUpdate.status).toBe(201);

    });

    it("should fail update with token", async () => {

        const preUpdate = new userFactory().createAndUpdateWithoutToken()

        const afterUpdate = await request(app).put(URL_TEST.PUT_FIND_BY_ID_AND_UPDATE).send(preUpdate);

        expect(afterUpdate.status).toBe(409);
    });


});

