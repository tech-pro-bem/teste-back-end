import { Router } from 'express';
import { volunteersRoutes } from './volunteers.routes';

const router = Router();

router.use('/voluntary', volunteersRoutes);

export { router };