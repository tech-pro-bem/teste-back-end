import { Types } from "mongoose";
import User from "../../entites/User";
import { UserInterface } from "../../types/userTypes";

interface UserFindRepository {
    find(): Promise<UserInterface[]>;
    findById(id: string): Promise<UserInterface | null>;
    findByEmail(email: string): Promise<UserInterface | null>;
}

export { UserFindRepository };
