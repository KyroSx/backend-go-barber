import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

const makeSut = () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const sut = new ShowProfileService(fakeUsersRepository);

  return { sut, fakeUsersRepository };
};

describe('Show Profile Service', () => {
  it('should show whether user_id exists', async () => {
    const { sut, fakeUsersRepository } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'User name',
      email: 'user_email@mail.com',
      password: 'password',
    });

    const userShowed = await sut.execute({
      user_id: user.id,
    });

    expect(userShowed?.name).toBe('User name');
    expect(userShowed?.email).toBe('user_email@mail.com');
  });

  it('should not show whether user_id does not exists', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        user_id: 'non_existing_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
