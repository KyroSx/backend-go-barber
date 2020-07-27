import { inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: IRequest): Promise<Array<Appointment>> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        user_id,
        day,
        month,
        year,
      },
    );
    return appointments;
  }
}

export default ListProviderAppointmentService;
