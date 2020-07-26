import { uuid } from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { isEqual, getMonth, getYear } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Array<Appointment> = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFiltred = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointmentFiltred;
  }

  public async findAllInMonthFromProvider({
    user_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Array<Appointment>> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === user_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    const objectToAssignment = {
      id: uuid(),
      date,
      provider_id,
    };

    Object.assign(appointment, objectToAssignment);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
