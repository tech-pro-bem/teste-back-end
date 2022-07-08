import { Router } from "express";
import { userCreateFactory } from "../modules/createUserFacotry/createFactory";
import { userFindFactory } from "../modules/createUserFacotry/findFactory";

const routes = Router();



routes.post("/api/v1/users/create", (req, res) => userCreateFactory().save(req, res));
routes.get("/api/v1/users/list", (req, res) => userFindFactory().find(req, res));
routes.get("/api/v1/users/find_by_id", (req, res) => userFindFactory().findById(req, res));

export { routes };
