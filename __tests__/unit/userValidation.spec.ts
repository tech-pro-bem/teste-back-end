import { UserDeleteService } from "../../src/service/user/UserDeleteService";
import { UserUpdateService } from "../../src/service/user/UserUpdateService";
import { UserValidation } from "../../src/utils/users/UserValidation";
import { userFactory } from "../utils/userFactory";
import { _server } from "../_server";


describe("[unit] - userValidation", () => {
    _server.listen(7777)

    let validation: UserValidation;
    let userDeleteService: UserDeleteService;

    beforeAll(async () => {

        validation = new UserValidation(new UserUpdateService());
        userDeleteService = new UserDeleteService;
    });

    afterAll(async () => {
        await userDeleteService.deleteMany();
    });

    it("should pass without error in valid user", async () => {
        const user = new userFactory().create();

        const validate = await new UserValidation(new UserUpdateService()).check(user);

        expect(Object.values(validate).length).toBe(0)
    });

    it("should fail in pass without error in valid user", async () => {
        const user = new userFactory().createEmptyValues();

        const validate = await new UserValidation(new UserUpdateService()).check(user);

        expect(Object.values(validate).length).toBeGreaterThanOrEqual(3)
    });

    it("should check role user", async () => {
        const user = new userFactory().create();

        const validate = await new UserValidation(new UserUpdateService()).checkRoleUser(user.role);

        expect(validate).toBeUndefined();
    });

    it("should fail check role user", async () => {
        const user = new userFactory().createWithAdmin();

        await expect(validation.checkRoleUser(user.role)).rejects.toThrow()

    });

    it("should check role admin", async () => {
        const user = new userFactory().createWithAdmin();

        const validate = await new UserValidation(new UserUpdateService()).checkRoleAdmin(user.role);

        expect(validate).toBeUndefined();
    });


    it("should fail check role admin", async () => {
        const user = new userFactory().create();

        await expect(validation.checkRoleAdmin(user.role)).rejects.toThrow()

    });



    it("should set token", async () => {
        const token = await validation.setTokenAuth(51651651)
        expect(token?.length).toBeGreaterThanOrEqual(100)
    })

    it("should pass without error in update user", async () => {
        const user = new userFactory().create();
        const updateUser = new userFactory().updateUser();

        const validate = await validation.update(updateUser, user);

        expect(Object.values(validate).length).toBe(0)
    });

    it("should fail in pass without error in update user", async () => {
        const user = new userFactory().create();
        const updateUser = new userFactory().createWithMalformatedEmail();

        const validate = await new UserValidation(
            new UserUpdateService()
        ).update(updateUser, user);

        expect(Object.values(validate).length).toBeGreaterThanOrEqual(1)
    });
});