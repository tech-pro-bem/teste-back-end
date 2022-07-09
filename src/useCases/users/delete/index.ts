import { UserDeleteController } from "../../../controllers/userController/UserDeleteController";
import { UserDeleteService } from "../../../service/users/UserDeleteService";
import { UserFindService } from "../../../service/users/UserFindService";

export const userDeleteFactory = () => {
    return new UserDeleteController(new UserDeleteService(), new UserFindService());
};
