import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointments is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRoutes;
