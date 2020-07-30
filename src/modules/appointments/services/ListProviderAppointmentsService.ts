import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: IRequest): Promise<Array<Appointment>> {
    const cachedData = await this.cacheProvider.recover('key');

    console.log(cachedData);

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        user_id,
        day,
        month,
        year,
      },
    );

    // await this.cacheProvider.save('key', 'value');

    return appointments;
  }
}

export default ListProviderAppointmentService;
