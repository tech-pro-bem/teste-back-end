import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, lowercase: true, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, time: () => Date.now() },
    updated_at: { type: String, time: () => Date.now() },
});

UserSchema.pre<UserInterface>("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

export default model<UserInterface>("user_tech_pro_bem", UserSchema);