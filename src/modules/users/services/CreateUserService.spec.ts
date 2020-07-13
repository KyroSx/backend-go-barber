import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/UsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
  it('should be able to create a new user ', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const userCreated = await createUserService.execute({
      name: 'name',
      email: 'email@mail.com',
      password: 'password',
    });

    expect(userCreated).toHaveProperty('id');
  });

  it("should not be able to create a new user with another user's email", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const userEmail = 'email@mail.com';

    await createUserService.execute({
      name: 'name',
      email: userEmail,
      password: 'password',
    });

    expect(
      createUserService.execute({
        name: 'name',
        email: userEmail,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
