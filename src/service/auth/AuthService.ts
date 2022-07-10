import User from "../../entites/User";
import { AuthRepository } from "../../repositories/auth/AuthRepository";
import { UserCreateRepository } from "../../repositories/users/UserCreateRepository";
import { ISignIn, UserInterface } from "../../types/userTypes";
import bcryptjs from 'bcryptjs';


class AuthService implements AuthRepository {
    async signIn(email: string) {

        const user = await User.findOne({
            email
        }).select("+password")

        if (!user) {
            throw Error("email " + email + " não encontrado")
        }

        return user;

    }
}

export { AuthService };
