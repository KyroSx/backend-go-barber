import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Authenticate User Service', () => {
  it('should authenticate user if correct data are provided', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakerHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakerHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakerHashProvider,
    );

    const user = await createUserService.execute({
      name: 'name',
      email: 'email@mail.com',
      password: 'password',
    });

    const response = await authenticateUserService.execute({
      email: 'email@mail.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not authenticate user if no user already created', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakerHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakerHashProvider,
    );

    const response = authenticateUserService.execute({
      email: 'invalid_email@mail.com',
      password: 'password',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate user if password is wrong', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakerHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakerHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakerHashProvider,
    );

    await createUserService.execute({
      name: 'name',
      email: 'email@mail.com',
      password: 'password',
    });

    const response = authenticateUserService.execute({
      email: 'email@mail.com',
      password: 'wrong_password',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });
});
