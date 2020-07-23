import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

const makeSut = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const sut = new CreateUserService(fakeUserRepository, fakeHashProvider);

  return { sut, fakeHashProvider, fakeUserRepository };
};

describe('Create User', () => {
  it('should be able to create a new user ', async () => {
    const { sut } = makeSut();

    const userCreated = await sut.execute({
      name: 'name',
      email: 'email@mail.com',
      password: 'password',
    });

    expect(userCreated).toHaveProperty('id');
  });

  it("should not be able to create a new user with another user's email", async () => {
    const { sut } = makeSut();

    const userEmail = 'email@mail.com';

    await sut.execute({
      name: 'name',
      email: userEmail,
      password: 'password',
    });

    await expect(
      sut.execute({
        name: 'name',
        email: userEmail,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
