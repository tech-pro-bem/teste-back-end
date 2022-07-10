export interface UserInterface {
    id?: string;
    _id?: string;
    name: string;
    email: string;
    password: string;
    confirm_password?: string;
    created_at?: Date;
    updated_at?: Date;
    role?: IRole
}

export interface ISignIn {
    email: string;
    password: string;
}

export enum IRole {
    admin = 'admin',
    user = 'user',
}
