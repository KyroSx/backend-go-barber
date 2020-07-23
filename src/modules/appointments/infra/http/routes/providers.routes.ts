import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRoutes = Router();
const appointmentsController = new ProvidersController();

providersRoutes.use(ensureAuthenticated);

/* providersRoutes.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

providersRoutes.get('/', appointmentsController.index);

export default providersRoutes;
