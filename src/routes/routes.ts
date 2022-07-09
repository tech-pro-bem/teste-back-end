import { Router } from "express";
import { authController, authenticate } from "../useCases/auth";
import { userCreateFactory } from "../useCases/users/create";
import { userDeleteFactory } from "../useCases/users/delete";
import { userFindFactory } from "../useCases/users/find";
import { userUpdateFactory } from "../useCases/users/update";

const routes = Router();

routes.post("/api/v1/users/create", (req, res) => userCreateFactory().save(req, res));
routes.get("/api/v1/users/list", (req, res) => userFindFactory().find(req, res));
routes.get("/api/v1/users/find_by_id", (req, res) => userFindFactory().findById(req, res));
routes.put("/api/v1/users/find_by_id_and_update", authenticate().authorize, (req, res) => userUpdateFactory().findByIdAndUpdate(req, res));
routes.delete("/api/v1/users/delete_one", (req, res) => userDeleteFactory().deleteOne(req, res));
routes.delete("/api/v1/users/delete_many", (req, res) => userDeleteFactory().deleteMany(req, res));


routes.post("/api/v1/users/sign_in", (req, res) => authController().signIn(req, res));

export { routes };
