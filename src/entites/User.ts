import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IRole } from "../types/userTypes";



interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    created_at: Date;
    updated_at: Date;
    role: IRole;
}



const UserSchema: Schema = new Schema({
    name: { type: String, lowercase: true, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: {
        type: String, max: 50,
        required: true, select: false
    },
    confirm_password: {
        type: String, max: 50,
        required: true, select: false
    },
    created_at: { type: Date, time: () => Date.now(), required: true },
    updated_at: { type: String, time: () => Date.now(), required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

UserSchema.pre('save', function (next) {
    return bcrypt
        .genSalt(10)
        .then((salt) =>
            bcrypt.hash(this.password, salt).then((hash) => {
                this.password = hash
                next()
            })
        )
        .catch(next)
})



export default model<UserInterface>("user_tech_pro_bem", UserSchema);