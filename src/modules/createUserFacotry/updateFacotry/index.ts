import { UserUpdateController } from "../../../controllers/userController/UserUpdateController";
import { UserUpdateService } from "../../../service/users/UserUpdateService";

export const userUpdateFactory = () => {
    return new UserUpdateController(
        new UserUpdateService());
};
