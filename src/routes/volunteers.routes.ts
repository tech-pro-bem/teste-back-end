import { Router } from 'express';
import { CreateVoluntaryController } from '../modules/volunteers/useCases/createVoluntary/CreateVoluntaryController';
const volunteersRoutes = Router();

const createVoluntaryController = new CreateVoluntaryController();

volunteersRoutes.post('/', createVoluntaryController.handle);

export { volunteersRoutes };
