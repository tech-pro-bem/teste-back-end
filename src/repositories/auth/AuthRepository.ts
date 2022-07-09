import { Types } from "mongoose";
import { ISignIn, UserInterface } from "../../types/userTypes";

interface AuthRepository {
    signIn(email: string): Promise<(UserInterface & {
        _id: Types.ObjectId;
    }) | null>;
}

export { AuthRepository };
