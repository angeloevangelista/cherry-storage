import { hash } from 'bcrypt';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  surname?: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    surname,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkIfUserExist = await this.usersRepository.findByEmail(email);

    if (checkIfUserExist) {
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
