import { Router } from "express";
import { userCreateFactory } from "../modules/createUserFacotry/createFactory";
import { userDeleteFactory } from "../modules/createUserFacotry/deleteFactory";
import { userFindFactory } from "../modules/createUserFacotry/findFactory";
import { userUpdateFactory } from "../modules/createUserFacotry/updateFacotry";

const routes = Router();

routes.post("/api/v1/users/create", (req, res) => userCreateFactory().save(req, res));
routes.get("/api/v1/users/list", (req, res) => userFindFactory().find(req, res));
routes.get("/api/v1/users/find_by_id", (req, res) => userFindFactory().findById(req, res));
routes.put("/api/v1/users/find_by_id_and_update", (req, res) => userUpdateFactory().findByIdAndUpdate(req, res));
routes.delete("/api/v1/users/delete_one", (req, res) => userDeleteFactory().deleteOne(req, res));
routes.delete("/api/v1/users/delete_many", (req, res) => userDeleteFactory().deleteMany(req, res));

export { routes };
