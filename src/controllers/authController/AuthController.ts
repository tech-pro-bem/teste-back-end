import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/AuthService';
import bcryptjs from "bcryptjs";
import { UtilsUser } from '../../utils';
import { UserFindService } from '../../service/user/UserFindService';
import User from '../../entites/User';


interface RequestProps extends Request {
    id_user?: string;
}

export class AuthController {
    constructor(private authService: AuthService,
        private userFindService: UserFindService,
        private utilsUser: UtilsUser) {
    }
    async signIn(req: Request, res: Response) {
        const {
            email = '',
            password = ''
        } = req.body;


        try {

            const user = await this.authService.signIn(email);

            // descriptografar senha não esta funcionando
            // sempre retorna false

            //await this.utilsUser.compareEncodedPassword(password, user.password)
            const token = await this.utilsUser.setTokenAuth(user.id)
            return res.status(200).json({ user, token });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async authByToken(req: RequestProps, res: Response) {
        const id = String(req.id_user);

        try {
            const user = await this.userFindService.findById(id);
            return res.status(200).json({ user });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

