import 'reflect-metadata';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fake/FakeAppointmentsRepository';

const makeSut = () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();
  const sut = new ListProviderDayAvailabilityService(
    fakeAppointmentsRepository,
  );

  return { sut, fakeAppointmentsRepository };
};

describe('List Provider Day Availability Service', () => {
  it('should be able to list availability from provider in a day', async () => {
    const { sut, fakeAppointmentsRepository } = makeSut();

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      user_id: 'any_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      user_id: 'any_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availabilities = await sut.execute({
      user_id: 'any_provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availabilities).toEqual(
      expect.arrayContaining([
        { hour: 8, availability: false },
        { hour: 9, availability: false },
        { hour: 10, availability: false },
        { hour: 13, availability: true },
        { hour: 14, availability: false },
        { hour: 15, availability: false },
        { hour: 16, availability: true },
      ]),
    );
  });
});
