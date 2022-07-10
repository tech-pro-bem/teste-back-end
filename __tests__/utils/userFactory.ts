import { IRole } from "../../src/types/userTypes";

export class userFactory {
    uui = Math.random().toFixed(4).replaceAll(".", "");

    create() {
        return {
            confirm_password: '123456789',
            email: `anderson${this.uui}@gmail.com`,
            name: 'anderson',
            password: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
        }
    }

    updateUser() {
        return {
            confirm_password: 'sdsdadsasdasdasad',
            email: `update${this.uui}@gmail.com`,
            name: 'dssaddadsasda',
            password: 'sdsdadsasdasdasad',
            created_at: new Date(),
            updated_at: new Date(),
        }
    }

    createWithAdmin() {

        return {
            confirm_password: '123456789',
            email: `anderson${this.uui}@gmail.com`,
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
            email: `anderson${this.uui}@gmail.com`,
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
            email: `anderson${this.uui}@gmail.com`,
            name: "anderson",
            password: "123456789",
            created_at: new Date(),
            updated_at: new Date(),
        }
    }

    createWithMalformatedEmail() {
        return {
            confirm_password: "1234567893",
            email: `ander.son@gma.il.com`,
            name: "anderson",
            password: "123456789",
            token: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
        }
    }
}