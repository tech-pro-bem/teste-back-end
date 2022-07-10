import { UtilsUser } from "..";
import { UserUpdateService } from "../../service/user/UserUpdateService";


interface IErrors {
    name: string;
    email: string;
    password: string;
    confirm_password: string;

}
export class UserDataVerify extends UtilsUser {
    constructor(private userUpdateService: UserUpdateService) {
        super();
    }

    private errors = {} as any;

    get() {
        return this.errors;
    }



    protected name(name: string) {
        if (name.trim().length < 1 || name.trim().length > 20) {
            this.errors.name = 'O nome deve ter entre 1 e 20 caracteres';
        }

    }

    protected async email(email: string) {
        if (email.trim().length === 0 || this.regex.test(email) === false) {
            this.errors.email = 'Email mal formatado';
        }
    }

    protected async checkIsChangeEmail(email: string, actualEmail: string) {
        if (email.trim().length === 0 || this.regex.test(email) === false) {
            console.log('email mal')
            this.errors.email = 'email está mal formatado';

        } else if (email !== actualEmail) {
            const exist = await this.userUpdateService.emailExist(email);

            if (exist) {
                this.errors.email = 'esse email já esta em uso';
            }

        }
    }

    protected password(password: string, confirm_password: string) {

        if (password.trim().length < 8) {
            this.errors.password = 'A senha deve ter 8 digitos';
        }

        if (password !== confirm_password) {
            this.errors.confirm_password = 'As senhas devem ser igual';
        }

    }

}
