export interface UserInterface {
    id?: string;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface ISignIn {
    email: string;
    password: string;
}