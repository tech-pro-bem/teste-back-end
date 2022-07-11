import User from "../../entites/User";
import { UserDeleteRepository } from "../../repositories/users/UserDeleteRepository";


class UserDeleteService implements UserDeleteRepository {
    async deleteOne(id: string) {
        const user = await User.deleteOne({ _id: id })

        if (!user.acknowledged) {
            throw Error("id " + id + " não encontrado")
        }

    }

    async deleteMany() {
        await User.deleteMany();
    }

}

export { UserDeleteService };
