import { UserCreateService } from "../../src/service/user/UserCreateService";
import { UserDeleteService } from "../../src/service/user/UserDeleteService";
import { UserFindService } from "../../src/service/user/UserFindService";
import { UserInterface } from "../../src/types/userTypes";
import { userFactory } from "../utils/userFactory";
import { _server } from "../_server";

describe("[integration] - userFindService ", () => {
    _server.listen(4444)

    let userCreateService: UserCreateService;
    let userFindService: UserFindService;
    let userDeleteService: UserDeleteService;
    let userThatFind: UserInterface;

    beforeAll(async () => {

        userCreateService = new UserCreateService;
        userFindService = new UserFindService;
        userDeleteService = new UserDeleteService;

        const user = new userFactory().create()
        userThatFind = await userCreateService.create(user);

    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });


    it("should find by user id", async () => {
        const find = await userFindService.findById(String(userThatFind.id));
        expect(find).toHaveProperty("id")
    });


    it("should fail in find by user id", async () => {
        await expect(userFindService.findById(`${userThatFind.id}ww`)).rejects.toThrow()
    });


    it("should find all", async () => {
        const find = await userFindService.find();
        expect(find.length).toBeGreaterThanOrEqual(0)
    });


    it("should find by email ", async () => {
        await expect(userFindService.emailExist(userThatFind.email)).rejects.toThrow()
    });

    it("should fail in find by email ", async () => {
        const find = await userFindService.emailExist('userThatFind.email');

        expect(find).toBeUndefined();
    });

});