import { UserDeleteController } from "../../../controllers/userController/UserDeleteController";
import { UserDeleteService } from "../../../service/user/UserDeleteService";
import { UserFindService } from "../../../service/user/UserFindService";
import { UtilsUser } from "../../../utils";

export const userDeleteFactory = () => {
    return new UserDeleteController(
        new UserDeleteService(),
        new UserFindService(),
        new UtilsUser());
};
