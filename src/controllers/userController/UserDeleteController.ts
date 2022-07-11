import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserDeleteService } from "../../service/user/UserDeleteService";
import { UserFindService } from "../../service/user/UserFindService";
import { UtilsUser } from "../../utils";
import bcryptjs from "bcryptjs";


interface RequestProps extends Request {
    id_user?: string;
}

export class UserDeleteController {
    constructor(private userDeleteService: UserDeleteService,
        private userFindService: UserFindService,
        private utilsUser: UtilsUser) {
    }

    async deleteOne(req: RequestProps, res: Response): Promise<Response> {
        const { id } = req.query;

        try {


            await this.userFindService.findById(String(id));

            await this.userDeleteService.deleteOne(String(id));
            return res.status(204).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }


    async deleteMany(req: RequestProps, res: Response): Promise<Response> {

        try {
            await this.userDeleteService.deleteMany();
            return res.status(204).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async destroyerWithToken(req: RequestProps, res: Response): Promise<Response> {

        try {
            await this.userDeleteService.deleteMany();
            return res.status(204).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

}

