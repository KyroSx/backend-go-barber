import { Router } from 'express';
import { parseISO, startOfHour, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRoutes = Router();

const appointments: Array<Appointment> = [];

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointments is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRoutes;
