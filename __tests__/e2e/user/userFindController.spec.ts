import request from "supertest";
import { Server } from "http";
import { UserDeleteService } from "../../../src/service/user/UserDeleteService";
import { _server } from "../../_server";
import { userFactory } from "../../utils/userFactory";
import { URL_TEST } from "../../utils";
import { UserInterface } from "../../../src/types/userTypes";

describe("[e2e] - userFindController", () => {
    let app: Server;

    let userDeleteService: UserDeleteService;
    let userCreatedToBeFound: UserInterface;

    beforeAll(async () => {
        app = _server.listen(3344);

        userDeleteService = new UserDeleteService;
        const create = new userFactory().create()
        const createUser = await request(app).post(URL_TEST.POST_CREATE_USER).send(create)

        userCreatedToBeFound = await createUser.body;
    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });

    it("should find user", async () => {

        const find = await request(app).get(URL_TEST.GET_FIND_BY_USER_ID).query({ id: userCreatedToBeFound._id })

        expect(find.status).toBe(200);

    });

    it("should fail in find user with wrong id", async () => {
        const find = await request(app).get(URL_TEST.GET_FIND_BY_USER_ID).query({ id: 'userCreated.id' })
        expect(find.status).toBe(500);
    });

    it("find all", async () => {
        const findAll = await request(app).get(URL_TEST.GET_FIND)
        expect(findAll.status).toBe(200);
    });

});

