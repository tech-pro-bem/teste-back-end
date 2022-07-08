import { Request, Response } from 'express';
import { UserFindRepository } from '../../repositories/users/UserFindRepository';
import { UserUpdateRepository } from '../../repositories/users/UserUpdateRepository';
import { UserDeleteService } from '../../service/users/UserDeleteService';
import { UserFindService } from '../../service/users/UserFindService';



export class UserDeleteController {
    constructor(private userDeleteService: UserDeleteService,
        private userFindService: UserFindService) {
    }

    async deleteOne(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;

        try {

            await this.userFindService.findById(id);
            await this.userDeleteService.deleteOne(id);
            return res.status(204).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }


    async deleteMany(req: Request, res: Response): Promise<Response> {

        try {
            await this.userDeleteService.deleteMany();
            return res.status(204).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

