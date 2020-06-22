import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRoutes = Router();

const appointments = [];

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  return response.json(appointment);
});

export default appointmentsRoutes;
