import { UserUpdateController } from "../../../controllers/userController/UserUpdateController";
import { UserFindService } from "../../../service/users/UserFindService";
import { UserUpdateService } from "../../../service/users/UserUpdateService";

export const userUpdateFactory = () => {
    return new UserUpdateController(
        new UserUpdateService(),
        new UserFindService());
};
