import { Request, Response } from 'express';
import { UserFindService } from '../../service/user/UserFindService';
import { UtilsUser } from '../../utils';


interface RequestProps extends Request {
    id_user?: string;
}

export class UserFindController {
    constructor(private userFindService: UserFindService,
        private utilsUser: UtilsUser) {
    }

    async find(req: RequestProps, res: Response): Promise<Response> {

        try {
            const find = await this.userFindService.find();

            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async findById(req: RequestProps, res: Response): Promise<Response> {
        const { id } = req.query;


        try {
            const find = await this.userFindService.findById(String(id));

            return res.status(200).json(find);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

