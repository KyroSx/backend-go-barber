import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

const makeSut = () => {
  const fakeHashProvider = new FakeHashProvider();
  const fakeUsersRepository = new FakeUsersRepository();
  const sut = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);

  return { sut, fakeUsersRepository, fakeHashProvider };
};

describe('Update Profile Service', () => {
  it('should be able to update a profile', async () => {
    const { sut, fakeUsersRepository } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'User Name',
      email: 'user_email@mail.com',
      password: 'password',
    });

    const updatedUser = await sut.execute({
      user_id: user.id,
      name: 'Updated User Name',
      email: 'updated_user_email@mail.com',
    });

    expect(updatedUser.name).toBe('Updated User Name');
    expect(updatedUser.email).toBe('updated_user_email@mail.com');
  });

  it('should not be able to update email with an email already used', async () => {
    const { sut, fakeUsersRepository } = makeSut();

    await fakeUsersRepository.create({
      name: 'Other User Name',
      email: 'other_user_email@mail.com',
      password: 'password',
    });

    const user = await fakeUsersRepository.create({
      name: 'User Name',
      email: 'user_email@mail.com',
      password: 'password',
    });

    await expect(
      sut.execute({
        user_id: user.id,
        name: 'Other User Name',
        email: 'other_user_email@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a the password', async () => {
    const { sut, fakeUsersRepository, fakeHashProvider } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'User Name',
      email: 'user_email@mail.com',
      password: 'password',
    });

    const updatedUser = await sut.execute({
      user_id: user.id,
      name: 'Updated User Name',
      email: 'updated_user_email@mail.com',
      old_password: 'password',
      new_password: 'new_password',
    });

    const hashedNewPassword = await fakeHashProvider.generateHash(
      'new_password',
    );

    expect(updatedUser.name).toBe('Updated User Name');
    expect(updatedUser.email).toBe('updated_user_email@mail.com');
    expect(updatedUser.password).toBe(hashedNewPassword);
  });

  it('should not be able to update the password without entering the old password', async () => {
    const { sut, fakeUsersRepository } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'User Name',
      email: 'user_email@mail.com',
      password: 'password',
    });

    await expect(
      sut.execute({
        user_id: user.id,
        name: 'Updated User Name',
        email: 'updated_user_email@mail.com',
        new_password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not show whether user_id does not exists', async () => {
    const { sut } = makeSut();

    expect(
      sut.execute({
        user_id: 'non_existing_user_id',
        name: 'Non existing Name',
        email: 'non_existing_user_mail@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password entering incorrect old password', async () => {
    const { sut, fakeUsersRepository } = makeSut();

    const user = await fakeUsersRepository.create({
      name: 'User Name',
      email: 'user_email@mail.com',
      password: 'password',
    });

    await expect(
      sut.execute({
        user_id: user.id,
        name: 'User Name',
        email: 'updated_user_email@mail.com',
        old_password: 'incorrect_password',
        new_password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
