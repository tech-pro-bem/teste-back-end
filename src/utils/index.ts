import bcryptjs from "bcryptjs";
import { IRole } from '../types/userTypes';
import authConfig from "../config";
import jwt from "jsonwebtoken";


export class UtilsUser {
    regex = new RegExp(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    );
    async encodedPassword(password: string) {
        return await bcryptjs.hash(password, 10);
    }

    async compareEncodedPassword(password: string, hash: string) {
        const compareEncodedPassword = await bcryptjs.compare(password, hash);

        if (!compareEncodedPassword) {
            throw Error("senha errada")
        }

    }

    public checkRoleUser(userRole: string) {
        if (userRole !== IRole.user) {
            throw Error("você não tem autorização, seu registro é: " + userRole)
        }
    }

    public checkRoleAdmin(userRole: string) {
        if (userRole !== IRole.admin) {
            throw Error("você não tem autorização, seu registro é: " + userRole)
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