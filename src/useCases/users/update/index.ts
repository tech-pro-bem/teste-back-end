import { UserUpdateController } from "../../../controllers/userController/UserUpdateController";
import { UserFindService } from "../../../service/user/UserFindService";
import { UserUpdateService } from "../../../service/user/UserUpdateService";
import { UtilsUser } from "../../../utils";
import { UserValidation } from "../../../utils/users/UserValidation";

export const userUpdateFactory = () => {
    return new UserUpdateController(
        new UserUpdateService(),
        new UserFindService(),
        new UtilsUser(),
        new UserValidation(new UserUpdateService())
    );
};
