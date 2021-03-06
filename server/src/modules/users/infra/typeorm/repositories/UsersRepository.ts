import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async update(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create({
    name,
    surname,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      surname,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(
      {
        email,
      },
      {
        select: ['id', 'name', 'surname', 'email', 'password', 'avatar'],
      },
    );

    return user;
  }
}

export default UsersRepository;
