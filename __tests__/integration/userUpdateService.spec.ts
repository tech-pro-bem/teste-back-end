import { UserCreateService } from "../../src/service/user/UserCreateService";
import { UserDeleteService } from "../../src/service/user/UserDeleteService";
import { UserFindService } from "../../src/service/user/UserFindService";
import { UserUpdateService } from "../../src/service/user/UserUpdateService";
import { UserInterface } from "../../src/types/userTypes";
import { userFactory } from "../utils/userFactory";
import { _server } from "../_server";

describe("[integration] - userUpdateService ", () => {
    _server.listen(6666)

    let userCreateService: UserCreateService;
    let userFindService: UserFindService;
    let userUpdateService: UserUpdateService;
    let userDeleteService: UserDeleteService;
    let userToBeUpdate: UserInterface;

    beforeAll(async () => {

        userCreateService = new UserCreateService;
        userFindService = new UserFindService;
        userUpdateService = new UserUpdateService;
        userDeleteService = new UserDeleteService;

        const user = new userFactory().create()
        userToBeUpdate = await userCreateService.create(user);

    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });


    it("should update user", async () => {
        const updateUser = new userFactory().updateUser();

        const newUser = {
            id: userToBeUpdate.id,
            name: updateUser.name,
            email: updateUser.email,
            password: updateUser.password,
            confirm_password: updateUser.confirm_password,
            role: userToBeUpdate.role
        }
        await userUpdateService.findByIdAndUpdate(newUser);

        const find = await userFindService.findById(String(newUser.id));

        expect(newUser.email).toBe(find.email)
    });

    it("should fail in update user with wrong id", async () => {

        expect(userFindService.findById('userToBeUpdate.id')).rejects.toThrow()
    });




});