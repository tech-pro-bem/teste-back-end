import { UserCreateController } from "../../../controllers/userController/UserCreateController";
import { UserCreateService } from "../../../service/user/UserCreateService";
import { UserFindService } from "../../../service/user/UserFindService";
import { UserUpdateService } from "../../../service/user/UserUpdateService";
import { UtilsUser } from "../../../utils";
import { UserValidation } from "../../../utils/users/UserValidation";

export const userCreateFactory = () => {
    return new UserCreateController(
        new UserCreateService(),
        new UserFindService(),
        new UserValidation(new UserUpdateService()),
        new UtilsUser()
    );
};

