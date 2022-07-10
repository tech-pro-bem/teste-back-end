import { UserInterface } from "../../types/userTypes"
import { UserDataVerify } from "./UserDataVerify"



export class UserValidation extends UserDataVerify {

    async check(user: UserInterface) {
        await this.email(user.email)
        this.name(user.name)
        this.password(user.password, String(user.confirm_password))

        return this.get()
    }

    async update(values: UserInterface, user: UserInterface) {
        await this.checkIsChangeEmail(values.email, user.email)
        this.name(values.name)
        this.password(values.password, String(values.confirm_password))

        return this.get();
    }


}

