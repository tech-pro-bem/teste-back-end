import { UserCreateService } from "../../src/service/user/UserCreateService";
import { UserDeleteService } from "../../src/service/user/UserDeleteService";
import { UserFindService } from "../../src/service/user/UserFindService";
import { UserInterface } from "../../src/types/userTypes";
import { userFactory } from "../utils/userFactory";
import { _server } from "../_server";

describe("[integration] - userDeleteService ", () => {
    _server.listen(5555)

    let userCreateService: UserCreateService;
    let userFindService: UserFindService;
    let userDeleteService: UserDeleteService;
    let userToBeDeleted: UserInterface;

    beforeAll(async () => {

        userCreateService = new UserCreateService;
        userFindService = new UserFindService;
        userDeleteService = new UserDeleteService;

        const user = new userFactory().create()
        userToBeDeleted = await userCreateService.create(user);

    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });


    it("should delete by user id", async () => {
        const deleteOne = await userDeleteService.deleteOne(String(userToBeDeleted.id));
        expect(deleteOne).toBeUndefined()
    });


    it("should fail in delete by user id", async () => {
        await expect(userDeleteService.deleteOne('String(userToBeDeleted.id)')).rejects.toThrow()
    });


    it("should detete all", async () => {
        const user1 = new userFactory().create()
        const user2 = new userFactory().create()
        const user3 = new userFactory().create()

        await userCreateService.create(user1);
        await userCreateService.create(user2);
        await userCreateService.create(user3);

        const preDelete = await userFindService.find();
        expect(preDelete.length).toBe(3)

        await userDeleteService.deleteMany();

        const afterDelete = await userFindService.find();

        expect(afterDelete.length).toBe(0)
    });



});