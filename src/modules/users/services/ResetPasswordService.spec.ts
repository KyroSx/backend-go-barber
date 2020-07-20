import 'reflect-metadata';

import ResetPasswordService from './ResetPasswordService';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

const makeSut = () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeUsersTokenRepository = new FakeUsersTokenRepository();
  const sut = new ResetPasswordService(
    fakeUsersRepository,
    fakeUsersTokenRepository,
  );

  return {
    sut,
    fakeUsersTokenRepository,
    fakeUsersRepository,
  };
};

describe('Reset Password Service', () => {
  it('should be able to reset the password', async () => {
    const { sut, fakeUsersRepository, fakeUsersTokenRepository } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'any_email@mail.com',
      password: '*********',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    await sut.execute({ token, password: '123456' });

    const userWithPasswordReseted = await fakeUsersRepository.findById(user.id);

    expect(userWithPasswordReseted?.password).toBe('123456');
  });
});
