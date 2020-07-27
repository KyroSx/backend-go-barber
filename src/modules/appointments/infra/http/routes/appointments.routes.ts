import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', appointmentsController.create);
appointmentsRoutes.get('/me', providerAppointmentsController.index);

export default appointmentsRoutes;
