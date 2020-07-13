import AppError from '@shared/errors/AppError';
import FakeAppointmentRepoistory from '../repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Create Appointment', () => {
  it('shold be able to create a new appointment', async () => {
    const fakeAppointmentRepoistory = new FakeAppointmentRepoistory();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepoistory,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: 'any_provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any_provider_id');
  });

  it('should not be able to create two appointments in same date', async () => {
    const fakeAppointmentRepoistory = new FakeAppointmentRepoistory();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepoistory,
    );

    const appointmentDate = new Date(2020, 4, 1, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'any_provider_id',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'any_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
