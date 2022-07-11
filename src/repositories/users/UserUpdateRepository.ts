import { ObjectId, Types } from "mongoose";
import User from "../../entites/User";
import { UserInterface } from "../../types/userTypes";

interface UserUpdateRepository {
    findByIdAndUpdate(data: UserInterface): void;
    emailExist(email: string): Promise<boolean>;
}

export { UserUpdateRepository };
