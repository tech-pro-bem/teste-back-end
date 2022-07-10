import { UserCreateService } from "../../src/service/user/UserCreateService";
import { UserDeleteService } from "../../src/service/user/UserDeleteService";
import { userFactory } from "../../utils/userFactory";
import { _server } from "../_server";

describe("[integration] - userCreateService ", () => {
    _server.listen(3333)

    let userCreateService: UserCreateService;
    let userDeleteService: UserDeleteService;

    beforeAll(async () => {

        userCreateService = new UserCreateService;
        userDeleteService = new UserDeleteService;

    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });


    it("should create user", async () => {
        const user = new userFactory().create()
        const create = await userCreateService.create(user);
        expect(create).toHaveProperty("id")
    });


    it("should fail in create user", async () => {
        const user = new userFactory().createEmptyValues();
        await expect(userCreateService.create(user)).rejects.toThrow()
    });

    it("should fail in create user with same email", async () => {
        const user = new userFactory().create()

        await userCreateService.create(user);

        await expect(userCreateService.create(user)).rejects.toThrow()
    });


    it("should fail in create user with wrong role", async () => {
        const user = new userFactory().createWrongRole() as any
        await expect(userCreateService.create(user)).rejects.toThrow()
    });







});