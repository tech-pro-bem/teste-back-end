import User from "../../entites/User";
import { UserFindRepository } from "../../repositories/users/UserFindRepository";
import { UserUpdateRepository } from "../../repositories/users/UserUpdateRepository";
import { UserInterface } from "../../types/userTypes";


class UserUpdateService implements UserUpdateRepository {
    async findByIdAndUpdate(data: UserInterface) {
        await User.findByIdAndUpdate(data.id, data, { new: true }).catch(err => {
            throw Error("id " + data.id + " não encontrado")
        });
    }
}

export { UserUpdateService };
