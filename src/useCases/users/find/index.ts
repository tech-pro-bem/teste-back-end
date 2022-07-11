import { UserFindController } from "../../../controllers/userController/UserFindController";
import { UserFindService } from "../../../service/user/UserFindService";
import { UtilsUser } from "../../../utils";

export const userFindFactory = () => {
    return new UserFindController(new UserFindService(), new UtilsUser());
};
