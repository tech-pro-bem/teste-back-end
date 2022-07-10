import request from "supertest";
import { Server } from "http";
import { UserDeleteService } from "../../../src/service/user/UserDeleteService";
import { _server } from "../../_server";
import { userFactory } from "../../utils/userFactory";
import { URL_TEST } from "../../utils";
import { UserInterface } from "../../../src/types/userTypes";

describe("[e2e] - authController", () => {
    let app: Server;

    let userDeleteService: UserDeleteService;
    let userAuthenticate: UserInterface;

    beforeAll(async () => {
        app = _server.listen(8055);

        userDeleteService = new UserDeleteService;

        const create = new userFactory().create()
        const createUser = await request(app).post(URL_TEST.POST_CREATE_USER).send(create)

        userAuthenticate = await createUser.body;
    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });

    it("should sign in", async () => {
        const sign_in = await request(app).post(URL_TEST.POST_SIGN_IN).send(userAuthenticate);
        expect(sign_in.status).toBe(200);

    });

    it("should fail in sign in", async () => {
        const create = new userFactory().createEmptyValues();
        const sign_in = await request(app).post(URL_TEST.POST_SIGN_IN).send(create);
        expect(sign_in.status).toBe(500);

    });
    it("should auth by token", async () => {
        const sign_in = await request(app).post(URL_TEST.POST_SIGN_IN).send(userAuthenticate);

        const authUser = await request(app).post(URL_TEST.POST_AUTH_BY_TOKEN).send({ authorization: `Bearer ${await sign_in.body.token}` });

        expect(authUser.status).toBe(200);

    });

    it("should fail in auth by token", async () => {
        const authUser = await request(app).post(URL_TEST.POST_AUTH_BY_TOKEN).send({ authorization: `Bearer sign_in.body.token` });
        expect(authUser.status).toBe(401);

    });

});

