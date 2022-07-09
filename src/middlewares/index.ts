import { NextFunction, Request, Response } from "express";
import authConfig from "../config";
import jwt from "jsonwebtoken";

interface RequestProps extends Request {
    id_user?: string;
}

class Authenticate {

    authorize(request: RequestProps, response: Response, next: NextFunction) {
        try {

            if (!authConfig[0].secret) {
                return response.status(401).send({ error: "fail in verify secret" });
            }

            let authHeader = request.body.authorization;

            if (!authHeader) {
                return response.status(401).send({ error: "no token provid" });
            }

            const parts = authHeader.split(" ");

            if (parts.length !== 2) {
                return response.status(409).send({ error: "token erro" });
            }

            const [schema, token] = parts;

            if (!/^Bearer$/i.test(schema)) {
                return response.status(401).send({ success: false, error: "token malformated" });
            }


            jwt.verify(token, authConfig[0].secret, (err: any, decoded: any) => {

                if (err) {
                    return response.status(401).send({ success: false, error: "token expirado" });
                }

                request.id_user = decoded.id;
                return next();
            });
        } catch (err) {
            return response.status(400).send({ success: false, error: "falha" });
        }
    }


}

export { Authenticate };