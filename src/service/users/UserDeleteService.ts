import User from "../../entites/User";
import { UserDeleteRepository } from "../../repositories/users/UserDeleteRepository";


class UserDeleteService implements UserDeleteRepository {
    async deleteOne(id: string) {
        await User.deleteOne({ _id: id });
    }

    async deleteMany() {
        await User.deleteMany();
    }

}

export { UserDeleteService };
