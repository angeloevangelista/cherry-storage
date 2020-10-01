import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'username',
      surname: 'user_surname',
      email: 'user@domain.com',
      password: '1111111111',
    });

    expect(user).toHaveProperty('id');
  });
});
