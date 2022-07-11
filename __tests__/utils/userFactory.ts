import { IRole, UserInterface } from "../../src/types/userTypes";

export class userFactory {
    uui = Math.random().toFixed(4).replaceAll(".", "");

    create() {
        return {
            confirm_password: '123456789',
            email: `${this.uui}anderson@gmail.com`,
            name: 'anderson',
            password: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
            role: IRole.user
        }
    }

    createAndUpdate(data: UserInterface, token: string) {
        return {
            confirm_password: '147258369',
            email: `${this.uui}update@gmail.com`,
            name: 'silver',
            password: '147258369',
            created_at: data.created_at,
            updated_at: new Date(),
            role: data.role,
            authorization: `Bearer ${token}`
        }
    }


    createAndUpdateWithoutToken() {
        return {
            confirm_password: '',
            email: '',
            name: '',
            password: '',
            token: '',
            created_at: new Date(),
            updated_at: new Date(),
            authorization: `Bearer   token}'`
        }
    }

    updateUser() {
        return {
            confirm_password: '123456789',
            email: `${this.uui}anderson@gmail.com`,
            name: 'anderson',
            password: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
            role: IRole.user

        }
    }

    createWithAdmin() {

        return {
            confirm_password: '123456789',
            email: `${this.uui}anderson@gmail.com`,
            name: 'anderson',
            password: '123456789',
            token: '123456789',
            role: IRole.admin,
            created_at: new Date(),
            updated_at: new Date(),
        }
    }
    createWrongRole() {
        return {
            confirm_password: '123456789',
            email: `${this.uui}anderson@gmail.com`,
            name: 'anderson',
            password: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
            role: 'userw',

        }
    }
    createEmptyValues() {
        return {
            confirm_password: '',
            email: '',
            name: '',
            password: '',
            token: '',
            created_at: new Date(),
            updated_at: new Date(),
        }
    }

    createWrongPassword() {
        return {
            confirm_password: "12345674893",
            email: `${this.uui}anderson@gmail.com`,
            name: "anderson",
            password: "123456789",
            created_at: new Date(),
            updated_at: new Date(),
        }
    }

    createWithMalformatedEmail() {
        return {
            confirm_password: "1234567893",
            email: `ander.son@gmailcom`,
            name: "anderson",
            password: "123456789",
            token: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
        }
    }
}