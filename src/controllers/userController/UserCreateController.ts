import { Request, Response } from 'express';
import { UserCreateService } from '../../service/user/UserCreateService';
import { UserFindService } from '../../service/user/UserFindService';
import { IRole, UserInterface } from '../../types/userTypes';
import { UtilsUser } from '../../utils';
import { UserValidation } from '../../utils/users/UserValidation';
import bcryptjs from "bcryptjs";



export class UserCreateController {
    constructor(private userCreateService: UserCreateService,
        private userFindService: UserFindService,
        private userValidation: UserValidation,
        private utilsUser: UtilsUser) {
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { email = '', name = '',
            password = '', confirm_password = '', role } = req.body;

        try {
            const data: UserInterface = {
                email: String(email).toLowerCase(),
                name: String(name).toLowerCase(),
                password: String(password),
                confirm_password: String(confirm_password),
                created_at: new Date(),
                updated_at: new Date(),
            };

            if (role) {
                data.role = role;
            }

            const validation = await this.userValidation.check(data);

            if (Object.values(validation).length) {
                return res.status(500).json({ error: validation });
            }

            await this.userFindService.emailExist(data.email);

            data.password = await this.utilsUser.encodedPassword(data.password);

            data.confirm_password = data.password;

            const user = await this.userCreateService.create(data)
            return res.status(201).json(user);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

