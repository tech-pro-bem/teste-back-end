import { UserDeleteService } from "../../../src/service/user/UserDeleteService";
import { _server } from "../../_server";
import { Server } from "http";
import { userFactory } from "../../utils/userFactory";
import request from "supertest";
import { URL_TEST } from "../../utils";


describe("[e2e] - userCreateController", () => {
    let app: Server;

    let userDeleteService: UserDeleteService;

    beforeAll(() => {
        app = _server.listen(8888);
        userDeleteService = new UserDeleteService;
    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });


    it("should create user", async () => {
        const user = new userFactory().create()
        const create = await request(app).post(URL_TEST.POST_CREATE_USER).send(user)

        expect(create.status).toBe(201);
    });

    it("should fail in create with empty values", async () => {
        const user = new userFactory().createEmptyValues()

        await request(app).post(URL_TEST.POST_CREATE_USER).send(user)

        const create = await request(app).post(URL_TEST.POST_CREATE_USER).send(user)

        expect(create.status).toBe(500);
    });

    it("should fail in create same email", async () => {
        const user = new userFactory().create()

        await request(app).post(URL_TEST.POST_CREATE_USER).send(user)

        const create = await request(app).post(URL_TEST.POST_CREATE_USER).send(user)

        expect(create.status).toBe(500);
    });

    it("should fail in create user with password not equal", async () => {
        const user = new userFactory().createWrongPassword()
        const create = await request(app).post(URL_TEST.POST_CREATE_USER).send(user)
        expect(create.status).toBe(500);
    });

    it("should fail in create user with email mal formated", async () => {
        const user = new userFactory().createWithMalformatedEmail()
        const create = await request(app).post(URL_TEST.POST_CREATE_USER).send(user)
        expect(create.status).toBe(500);
    });

    it("should fail in create user with empty values", async () => {
        const user = new userFactory().createEmptyValues()

        const create = await request(app).post(URL_TEST.POST_CREATE_USER).send(user)

        expect(create.status).toBe(500);
    });

});

