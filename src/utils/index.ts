import bcryptjs from "bcryptjs";
import { IRole } from '../types/userTypes';
import authConfig from "../config";
import jwt from "jsonwebtoken";


export class UtilsUser {
    regex = new RegExp("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");

    async encodedPassword(password: string) {
        return await bcryptjs.hash(password, 10);
    }

    async compareEncodedPassword(password: string, hash: string) {
        const compareEncodedPassword = await bcryptjs.compare(password, hash);

        if (!compareEncodedPassword) {
            throw Error("senha errada")
        }

    }

    public async checkRoleUser(userRole: string) {
        if (userRole !== IRole.user) {
            throw new Error("você não tem autorização, seu registro é: " + userRole)
        }
    }

    public async checkRoleAdmin(userRole: string) {
        if (userRole !== IRole.admin) {
            throw new Error("você não tem autorização, seu registro é: " + userRole)
        }
    }

    async setTokenAuth(_id: number) {
        if (!authConfig[0].secret) {
            return;
        }

        const token = jwt.sign({ id: _id }, authConfig[0].secret, {
            expiresIn: 86400,
        });

        return token;
    }



}