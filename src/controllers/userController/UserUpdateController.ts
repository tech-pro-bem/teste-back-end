import { Request, Response } from 'express';
import { UserFindService } from '../../service/user/UserFindService';
import { UserUpdateService } from '../../service/user/UserUpdateService';
import { IRole } from '../../types/userTypes';
import { UtilsUser } from '../../utils';
import { UserValidation } from '../../utils/users/UserValidation';


interface RequestProps extends Request {
    id_user?: string;
}

export class UserUpdateController {
    constructor(private userUpdateService: UserUpdateService,
        private userFindService: UserFindService,
        private utilsUser: UtilsUser,
        private userValidation: UserValidation) {
    }

    async findByIdAndUpdate(req: RequestProps, res: Response): Promise<Response> {
        const { name = '', email = '', password = '', confirm_password = '', } = req.body;
        const id_user = String(req.id_user);

        try {

            const values: any = {
                id: id_user,
                name: String(name),
                email: String(email),
                password: String(password),
                confirm_password: String(confirm_password),
                role: ""
            }
            const user = await this.userFindService.findById(values.id);

            const validation = await this.userValidation.check(values);

            if (Object.values(validation).length) {
                return res.status(500).json({ error: validation });
            }

            const updateValidate = await this.userValidation.update(values, user);

            if (Object.values(updateValidate).length) {
                return res.status(500).json({ error: updateValidate });
            }

            values.password = await this.utilsUser.encodedPassword(values.password);
            values.confirm_password = values.password

            values.created_at = user.created_at;
            values.updated_at = new Date();

            values.role = IRole[user.role];

            await this.userUpdateService.findByIdAndUpdate(values);
            return res.status(201).json(values);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

