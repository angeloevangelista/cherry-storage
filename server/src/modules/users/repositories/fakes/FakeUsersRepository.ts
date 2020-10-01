import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async update(userData: User): Promise<User> {
    const findUser = this.users.find((u) => u.id === userData.id);

    Object.assign(findUser, userData);

    this.users = this.users.map((user) => {
      return user.id === findUser.id ? findUser : user;
    });

    return findUser;
  }

  async findById(id: string): Promise<User> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data, {
      id: v4(),
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
}

export default FakeUsersRepository;
