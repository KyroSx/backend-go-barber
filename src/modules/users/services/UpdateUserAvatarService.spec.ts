import 'reflect-metadata';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

const makeSut = () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeStorageProvider = new FakeStorageProvider();
  const sut = new UpdateUserAvatarService(
    fakeUsersRepository,
    fakeStorageProvider,
  );
  return { sut, fakeUsersRepository, fakeStorageProvider };
};

describe('Update User Avatar Service', () => {
  it('should be able to update user avatar', async () => {
    const { fakeUsersRepository, sut } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    await sut.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpeg',
    });

    expect(user.avatar).toBe('avatar.jpeg');
  });

  it('should not be able to update avatar from non-existing user', async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        user_id: 'invalid_id',
        avatarFilename: 'avatar.jpeg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const { sut, fakeUsersRepository, fakeStorageProvider } = makeSut();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    await sut.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpeg',
    });

    await sut.execute({
      user_id: user.id,
      avatarFilename: 'updated_avatar.jpeg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpeg');
    expect(user.avatar).toBe('updated_avatar.jpeg');
  });
});
