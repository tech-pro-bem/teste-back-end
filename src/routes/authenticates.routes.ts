import { Router } from "express";
import { AuthenticateVoluntaryController } from "../modules/volunteers/useCases/authenticateVoluntary/AuthenticateVoluntaryController";

const authenticateRoutes = Router();

const authenticateVoluntaryController= new AuthenticateVoluntaryController();

authenticateRoutes.get('/session', authenticateVoluntaryController.handle);

export { authenticateRoutes };
