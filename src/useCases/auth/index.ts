import { AuthController } from "../../controllers/authController/AuthController";
import { Authenticate } from "../../middlewares";
import { AuthService } from "../../service/auth/AuthService";

export const authController = () => {
    return new AuthController(new AuthService())
};

export const authenticate = () => {
    return new Authenticate()
};
