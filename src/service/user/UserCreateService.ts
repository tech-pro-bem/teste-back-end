import User from "../../entites/User";
import { UserCreateRepository } from "../../repositories/users/UserCreateRepository";
import { UserInterface } from "../../types/userTypes";


class UserCreateService implements UserCreateRepository {

    async create(data: UserInterface) {
        return await User.create(data);
    }

}

export { UserCreateService };
