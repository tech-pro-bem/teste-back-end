import { Request, Response } from 'express';
import { UserFindRepository } from '../../repositories/users/UserFindRepository';



export class UserFindController {
    constructor(private userFindRepository: UserFindRepository) {
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const find = await this.userFindRepository.find();
            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.query;
        try {
            const find = await this.userFindRepository.findById(String(id));
            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async findByEmail(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        try {
            const find = await this.userFindRepository.findByEmail(email)
            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

