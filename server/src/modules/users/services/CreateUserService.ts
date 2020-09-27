import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  surname?: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, surname, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkIfUserExist = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkIfUserExist) {
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
