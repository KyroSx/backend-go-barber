import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

const makeSut = () => {
  const fakeHashProvider = new FakeHashProvider();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeUsersTokenRepository = new FakeUsersTokenRepository();
  const sut = new ResetPasswordService(
    fakeUsersRepository,
    fakeUsersTokenRepository,
    fakeHashProvider,
  );

  return {
    sut,
    fakeUsersTokenRepository,
    fakeUsersRepository,
    fakeHashProvider,
  };
};

describe('Reset Password Service', () => {
  it('should be able to reset the password', async () => {
    const {
      sut,
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'any_email@mail.com',
      password: '*********',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await sut.execute({ token, password: '123456' });

    const userWithPasswordReseted = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123456');
    expect(userWithPasswordReseted?.password).toBe('123456');
  });

  it('should not be able to reset the password without a non-existing token', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({ token: 'non_existing_token', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password without a non-existing user', async () => {
    const { sut, fakeUsersTokenRepository } = makeSut();

    const { token } = await fakeUsersTokenRepository.generate(
      'non_existing_user_id',
    );

    await expect(
      sut.execute({ token, password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
