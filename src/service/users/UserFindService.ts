import User from "../../entites/User";
import { UserFindRepository } from "../../repositories/users/UserFindRepository";
import { UserInterface } from "../../types/userTypes";


class UserFindService implements UserFindRepository {
    async find() {
        return await User.find();
    }

    async findById(id: string) {
        const find = await User.findById({ _id: id })

        if (!find) {
            throw Error("id " + id + " não encontrado")
        }

        return find;
    }



}

export { UserFindService };
