import { Router } from "express";
import { createUserFactory } from "../modules/createUserFacotry";

const routes = Router();



routes.post("/api/v1/users/create", (req, res) => createUserFactory().save(req, res));
//routes.get("/api/v1/users", (req, res) => createUserFactory().get(req, res));
// routes.get("/api/v1/users/list", (req, res) => createUserFactory().getAll(req, res));

export { routes };
