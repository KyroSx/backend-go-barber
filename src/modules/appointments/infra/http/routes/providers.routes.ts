import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRoutes = Router();
const appointmentsController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', appointmentsController.index);
providersRoutes.get(
  '/:provider_id/month-availability',
  providerDayAvailabilityController.index,
);
providersRoutes.get(
  '/:provider_id/day-availability',
  providerMonthAvailabilityController.index,
);

export default providersRoutes;
