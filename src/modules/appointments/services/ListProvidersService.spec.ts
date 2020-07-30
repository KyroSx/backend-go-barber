import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

const makeSut = () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeCacheProvider = new FakeCacheProvider();
  const sut = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);

  return { sut, fakeUsersRepository };
};

describe('List Providers Service', () => {
  it('should be able to list the providers', async () => {
    const { sut, fakeUsersRepository } = makeSut();

    const first_user = await fakeUsersRepository.create({
      name: 'First User',
      email: 'first_user_email@mail.com',
      password: 'password',
    });

    const second_user = await fakeUsersRepository.create({
      name: 'Second User',
      email: 'second_user_email@mail.com',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'logged_user_email@mail.com',
      password: 'password',
    });

    const providers = await sut.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([first_user, second_user]);
  });
});
