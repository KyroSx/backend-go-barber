import { Router } from 'express';
import { uuid } from 'uuidv4';
import { parseISO, startOfHour, isEqual } from 'date-fns';

const appointmentsRoutes = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRoutes;
