import 'reflect-metadata';

import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeEmailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';

const makeSut = () => {
  const fakeEmailProvider = new FakeEmailProvider();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeUsersTokenRepository = new FakeUsersTokenRepository();
  const sut = new SendForgotPasswordEmailService(
    fakeUsersRepository,
    fakeUsersTokenRepository,
    fakeEmailProvider,
  );

  return {
    sut,
    fakeUsersRepository,
    fakeEmailProvider,
    fakeUsersTokenRepository,
  };
};

describe('Send Forgot Password Email Service', () => {
  it('should be able to recover his password informing his email', async () => {
    const { sut, fakeUsersRepository, fakeEmailProvider } = makeSut();

    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'name',
      email: 'any_email@mail.com',
      password: '*********',
    });

    await sut.execute({ email: 'any_email@mail.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover an non-existing user password', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        email: 'non-existing-user-mail@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forget user password token', async () => {
    const { sut, fakeUsersTokenRepository, fakeUsersRepository } = makeSut();
    const generate = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'any_email@mail.com',
      password: '*********',
    });

    await sut.execute({
      email: 'any_email@mail.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
