import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

const makeSut = () => {
  const fakeAppointmentRepository = new FakeAppointmentRepository();
  const sut = new CreateAppointmentService(fakeAppointmentRepository);

  return { sut, fakeAppointmentRepository };
};

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const { sut } = makeSut();

    const appointment = await sut.execute({
      date: new Date(),
      provider_id: 'any_provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any_provider_id');
  });

  it('should not be able to create two appointments in same date', async () => {
    const { sut } = makeSut();

    const appointmentDate = new Date(2020, 4, 1, 11);

    await sut.execute({
      date: appointmentDate,
      provider_id: 'any_provider_id',
    });

    await expect(
      sut.execute({
        date: appointmentDate,
        provider_id: 'any_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
