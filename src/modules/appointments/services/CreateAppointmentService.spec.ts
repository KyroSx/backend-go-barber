import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

const makeSut = () => {
  const fakeAppointmentRepository = new FakeAppointmentRepository();
  const fakeNotificationsRepository = new FakeNotificationsRepository();
  const fakeCacheProvider = new FakeCacheProvider();
  const sut = new CreateAppointmentService(
    fakeAppointmentRepository,
    fakeNotificationsRepository,
    fakeCacheProvider,
  );

  return { sut, fakeAppointmentRepository };
};

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const { sut } = makeSut();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const appointment = await sut.execute({
      date: new Date(2020, 4, 20, 12),
      user_id: 'any_id',
      provider_id: 'any_provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any_provider_id');
  });

  it('should not be able to create two appointments in same date', async () => {
    const { sut } = makeSut();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const appointmentDate = new Date(2020, 4, 20, 11);

    await sut.execute({
      date: appointmentDate,
      user_id: 'any_id',
      provider_id: 'any_provider_id',
    });

    await expect(
      sut.execute({
        date: appointmentDate,
        user_id: 'any_id',
        provider_id: 'any_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments in a past date', async () => {
    const { sut } = makeSut();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const pastDate = new Date(2020, 4, 20, 10);

    await expect(
      sut.execute({
        date: pastDate,
        user_id: 'any_id',
        provider_id: 'any_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments if user is a provider at same time', async () => {
    const { sut } = makeSut();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const appointmentDate = new Date(2020, 4, 20, 13);

    await expect(
      sut.execute({
        date: appointmentDate,
        user_id: 'same_id',
        provider_id: 'same_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments with hour before 8 am and after 5 pm', async () => {
    const { sut } = makeSut();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const before8am = new Date(2020, 4, 20, 7);

    await expect(
      sut.execute({
        date: before8am,
        user_id: 'same_id',
        provider_id: 'same_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    const after5pm = new Date(2020, 4, 20, 17);

    await expect(
      sut.execute({
        date: after5pm,
        user_id: 'same_id',
        provider_id: 'same_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
