import User from "../../entites/User";
import { UserFindRepository } from "../../repositories/users/UserFindRepository";
import { UserInterface } from "../../types/userTypes";


class UserFindService implements UserFindRepository {
    async find() {
        return await User.find();
    }

    async findById(id: string) {
        return await User.findById({ _id: id });
    }



}

export { UserFindService };
