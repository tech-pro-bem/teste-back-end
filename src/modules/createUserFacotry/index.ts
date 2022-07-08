import { UserCreateController } from "../../controllers/userController/UserCreateController";
import { UserCreateService } from "../../service/UserCreateService";

export const createUserFactory = () => {
    return new UserCreateController(new UserCreateService);
};
