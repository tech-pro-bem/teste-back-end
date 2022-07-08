import { ObjectId, Types } from "mongoose";
import User from "../../entites/User";
import { UserInterface } from "../../types/userTypes";

interface UserFindRepository {
    find(): Promise<UserInterface[]>;

    findById(id: string): Promise<(UserInterface & {
        _id: Types.ObjectId;
    }) | null>
}

export { UserFindRepository };
