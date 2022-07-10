import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateVoluntaryController } from '../modules/volunteers/useCases/createVoluntary/CreateVoluntaryController';
import { DeleteVoluntaryController } from '../modules/volunteers/useCases/deleteVoluntary/DeleteVoluntaryController';
import { FindVoluntaryByEmailController } from '../modules/volunteers/useCases/findVoluntaryByEmail/FindVoluntaryByEmailController';
import { UpdateVoluntaryController } from '../modules/volunteers/useCases/updateVoluntary/UpdadeVoluntaryController';
const volunteersRoutes = Router();

const createVoluntaryController = new CreateVoluntaryController();
const deleteVoluntaryController = new DeleteVoluntaryController();
const findVoluntaryByEmailController = new FindVoluntaryByEmailController()
const updateVoluntaryController = new UpdateVoluntaryController();

volunteersRoutes.post('/', createVoluntaryController.handle);
volunteersRoutes.use(ensureAuthenticated);
volunteersRoutes.delete('/delete', deleteVoluntaryController.handle);
volunteersRoutes.get('/email', findVoluntaryByEmailController.handle);
volunteersRoutes.patch('/update', updateVoluntaryController.handle);

export { volunteersRoutes };
