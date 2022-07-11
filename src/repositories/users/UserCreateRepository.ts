import { UserInterface } from "../../types/userTypes";

interface UserCreateRepository {
    create(user: UserInterface): Promise<UserInterface>;
}

export { UserCreateRepository };
