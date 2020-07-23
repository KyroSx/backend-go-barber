import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

const makeSut = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakerHashProvider = new FakeHashProvider();

  const createUserService = new CreateUserService(
    fakeUserRepository,
    fakerHashProvider,
  );

  const sut = new AuthenticateUserService(
    fakeUserRepository,
    fakerHashProvider,
  );

  return { sut, createUserService, fakeUserRepository, fakerHashProvider };
};

describe('Authenticate User Service', () => {
  it('should authenticate user if correct data are provided', async () => {
    const { sut, createUserService } = makeSut();
    const user = await createUserService.execute({
      name: 'name',
      email: 'email@mail.com',
      password: 'password',
    });

    const response = await sut.execute({
      email: 'email@mail.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not authenticate user if no user already created', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        email: 'invalid_email@mail.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate user if password is wrong', async () => {
    const { sut, createUserService } = makeSut();

    await createUserService.execute({
      name: 'name',
      email: 'email@mail.com',
      password: 'password',
    });

    await expect(
      sut.execute({
        email: 'email@mail.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
