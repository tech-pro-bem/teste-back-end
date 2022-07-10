import User from "../../entites/User";
import { UserFindRepository } from "../../repositories/users/UserFindRepository";
import { UserInterface } from "../../types/userTypes";


class UserFindService implements UserFindRepository {
    async find() {
        return await User.find().select("+password");
    }

    async findById(id: string) {
        const find = await User.findById(id)

        if (!find) {
            throw Error("id " + id + " não encontrado")
        }

        return find;
    }

    async emailExist(email: string) {
        const find = await User.findOne({ email })

        if (find) {
            throw Error("esse email já foi registrado")
        }
    }



}

export { UserFindService };
