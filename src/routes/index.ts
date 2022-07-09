import { Router } from 'express';
import { authenticateRoutes } from './authenticates.routes';
import { volunteersRoutes } from './volunteers.routes';

const router = Router();

router.use('/voluntary', volunteersRoutes);
router.use(authenticateRoutes);

export { router };