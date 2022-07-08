import { Request, Response } from 'express';
import { UserCreateService } from '../../service/users/UserCreateService';



export class UserCreateController {
    constructor(private userCreateService: UserCreateService) {
    }

    async save(req: Request, res: Response): Promise<Response> {
        const { email = '', name = '', password = '' } = req.body;

        try {
            const data = { email, name, password };

            const user = await this.userCreateService.create(data)
            return res.status(201).json(user);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

