import User from "../../entites/User";
import { UserUpdateRepository } from "../../repositories/users/UserUpdateRepository";
import { UserInterface } from "../../types/userTypes";


class UserUpdateService implements UserUpdateRepository {

    async findByIdAndUpdate(data: UserInterface) {
        await User.findByIdAndUpdate(data.id, data, { new: true }).catch(err => {
            throw Error(err)
        });
    }

    async emailExist(email: string) {
        const find = await User.findOne({ email });

        if (find?.id) {
            return true;
        }

        return false;
    }

}

export { UserUpdateService };
