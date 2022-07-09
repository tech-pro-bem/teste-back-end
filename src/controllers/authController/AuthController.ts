import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/AuthService';
import { UserCreateService } from '../../service/users/UserCreateService';
import bcryptjs from "bcryptjs";



export class AuthController {
    constructor(private authService: AuthService) {
    }
    async signIn(req: Request, res: Response) {
        const {
            email = '',
            password = ''
        } = req.body;


        try {
            const data = { email, password }

            const user = await this.authService.signIn(data.email)

            const compareEncodedPassword = await bcryptjs.compare(data.password, user.password);

            if (!compareEncodedPassword) {
                return res.status(500).json({ error: "senha errada" });
            }

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

}

