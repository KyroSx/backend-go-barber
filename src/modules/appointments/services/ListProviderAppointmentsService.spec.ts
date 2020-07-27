import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fake/FakeAppointmentsRepository';
import ListProviderAppointmentService from './ListProviderAppointmentsService';

const makeSut = () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();
  const sut = new ListProviderAppointmentService(fakeAppointmentsRepository);

  return { sut, fakeAppointmentsRepository };
};

describe('List Provider Appointments Service', () => {
  it('should be able to list appointments from provider in a specific day', async () => {
    const { sut, fakeAppointmentsRepository } = makeSut();

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 11),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 11),
    });

    const appointments = await sut.execute({
      user_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
