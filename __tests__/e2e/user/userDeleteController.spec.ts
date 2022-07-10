import request from "supertest";
import { Server } from "http";
import { UserDeleteService } from "../../../src/service/user/UserDeleteService";
import { _server } from "../../_server";
import { userFactory } from "../../utils/userFactory";
import { URL_TEST } from "../../utils";
import { UserInterface } from "../../../src/types/userTypes";

describe("[e2e] - userDeleteController", () => {
    let app: Server;

    let userDeleteService: UserDeleteService;
    let userToBeDeleted: UserInterface;

    beforeAll(async () => {
        app = _server.listen(9999);

        userDeleteService = new UserDeleteService;
        const create = new userFactory().create()
        const createUser = await request(app).post(URL_TEST.POST_CREATE_USER).send(create)

        userToBeDeleted = await createUser.body;
    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });

    it("should delete user by id", async () => {
        const deleteById = await request(app).delete(URL_TEST.DELETE_DELTE_ONE).query({ id: userToBeDeleted._id })

        expect(deleteById.status).toBe(204);

    });

    it("should fail in delete user by id", async () => {
        const deleteById = await request(app).delete(URL_TEST.DELETE_DELTE_ONE).query({ id: 'userCreated.id' })
        expect(deleteById.status).toBe(500);
    });

    it("delete all", async () => {
        const deleteAll = await request(app).delete(URL_TEST.DELETE_DELETE_MANY)
        expect(deleteAll.status).toBe(204);
    });

    it("delete all", async () => {
        const deleteAll = await request(app).delete(URL_TEST.DELETE_DESTROYER)
        expect(deleteAll.status).toBe(204);
    });

});

