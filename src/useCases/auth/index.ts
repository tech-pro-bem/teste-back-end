import { AuthController } from "../../controllers/authController/AuthController";
import { Authenticate } from "../../middlewares";
import { AuthService } from "../../service/auth/AuthService";
import { UserFindService } from "../../service/user/UserFindService";
import { UtilsUser } from "../../utils";

export const authController = () => {
    return new AuthController(
        new AuthService(),
        new UserFindService(),
        new UtilsUser())
};

export const authenticate = () => {
    return new Authenticate()
};
