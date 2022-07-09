import { UserFindController } from "../../../controllers/userController/UserFindController";
import { UserFindService } from "../../../service/users/UserFindService";

export const userFindFactory = () => {
    return new UserFindController(new UserFindService());
};
