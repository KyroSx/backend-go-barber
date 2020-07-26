import 'reflect-metadata';

import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fake/FakeAppointmentsRepository';

const makeFakeUsersRepository = () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();

  return { fakeAppointmentsRepository };
};

const makeSut = () => {
  const { fakeAppointmentsRepository } = makeFakeUsersRepository();
  const sut = new ListProviderMonthAvailability(fakeAppointmentsRepository);

  return { sut, fakeAppointmentsRepository };
};

describe('List Provider Month Availability', () => {
  it('should be able to list availability from provider', async () => {
    const { sut, fakeAppointmentsRepository } = makeSut();

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 8, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 9, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 10, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 11, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 12, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 13, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 14, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 15, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 16, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 17, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 21, 17, 0),
    });

    const availabilities = await sut.execute({
      user_id: 'any_provider_id',
      month: 5,
      year: 2020,
    });

    expect(availabilities).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
