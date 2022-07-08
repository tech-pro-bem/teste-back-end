import { Request, Response } from 'express';
import { UserFindRepository } from '../../repositories/users/UserFindRepository';
import { UserUpdateRepository } from '../../repositories/users/UserUpdateRepository';
import { UserFindService } from '../../service/users/UserFindService';
import { UserUpdateService } from '../../service/users/UserUpdateService';



export class UserUpdateController {
    constructor(private userUpdateService: UserUpdateService) {
    }

    async findByIdAndUpdate(req: Request, res: Response): Promise<Response> {
        const { id, name, email, password } = req.body;

        try {

            const data = { id, name, email, password }

            await this.userUpdateService.findByIdAndUpdate(data);
            return res.status(201).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

