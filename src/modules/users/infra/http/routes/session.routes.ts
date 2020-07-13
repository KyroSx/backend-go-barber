import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionController = new SessionsController();

sessionsRoutes.post('/', sessionController.create);

export default sessionsRoutes;
