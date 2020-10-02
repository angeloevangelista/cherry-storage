import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import User from '../infra/typeorm/entities/User';

describe('AuthenticateUserService', () => {
  it('should not be able to authenticate an unregistered user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const email = 'user@domain.com';
    const password = '123456';

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
    );

    expect(
      authenticateUserService.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate a registered user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const email = 'user@domain.com';
    const password = '123456';

    await createUserService.execute({
      email,
      name: 'username',
      surname: 'user_surname',
      password,
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
    );

    const { token, user } = await authenticateUserService.execute({
      email,
      password,
    });

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(email);
    expect(user.password === password).toBeFalsy();
    expect(token.split('.').length === 3).toBeTruthy();
  });

  it('should not be able to authenticate a user with wrong email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const email = 'user@domain.com';
    const password = '123456';

    await createUserService.execute({
      email,
      name: 'username',
      surname: 'user_surname',
      password,
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
    );

    expect(
      authenticateUserService.execute({
        email: `wrong_${email}`,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const email = 'user@domain.com';
    const password = '123456';

    await createUserService.execute({
      email,
      name: 'username',
      surname: 'user_surname',
      password,
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
    );

    expect(
      authenticateUserService.execute({
        email,
        password: `wrong_${password}`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong credentials', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const email = 'user@domain.com';
    const password = '123456';

    await createUserService.execute({
      email,
      name: 'username',
      surname: 'user_surname',
      password,
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
    );

    expect(
      authenticateUserService.execute({
        email: `wrong_${email}`,
        password: `wrong_${password}`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should be able to set avatar_url if it is available', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const createUserService = new CreateUserService(fakeUsersRepository);

  //   const email = 'user@domain.com';
  //   const password = '123456';

  //   await createUserService.execute({
  //     email,
  //     name: 'username',
  //     surname: 'user_surname',
  //     password,
  //   });

  //   const authenticateUserService = new AuthenticateUserService(
  //     fakeUsersRepository,
  //   );

  //   expect(1 + 1).toBe(1);
  // });
});
