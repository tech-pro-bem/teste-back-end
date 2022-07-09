import { UserCreateController } from "../../../controllers/userController/UserCreateController";
import { UserCreateService } from "../../../service/users/UserCreateService";

export const userCreateFactory = () => {
    return new UserCreateController(new UserCreateService);
};
