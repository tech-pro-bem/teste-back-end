import { Request, Response } from 'express';
import { UserFindRepository } from '../../repositories/users/UserFindRepository';
import { UserFindService } from '../../service/users/UserFindService';



export class UserFindController {
    constructor(private userFindService: UserFindService) {
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const find = await this.userFindService.find();

            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.query;
        try {
            const find = await this.userFindService.findById(String(id));

            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

