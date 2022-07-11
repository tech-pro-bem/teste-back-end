import { UserInterface } from "../../types/userTypes";

interface UserDeleteRepository {
    deleteOne(id: string): void;
    deleteMany(): void;
}

export { UserDeleteRepository };
