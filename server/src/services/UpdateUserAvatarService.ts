import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/avatarUpload';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change avatar.');
    }

    if (user.avatar) {
      try {
        const userAvatarFilePath = path.join(
          uploadConfig.directory,
          user.avatar,
        );
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      } catch (error) {
        console.warn('An error occurred while deleting avatar file ❌');
        console.warn(error);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    user.avatar_url = `${process.env.AWS_S3_URL}/avatars/${user.avatar}`;

    return user;
  }
}

export default UpdateUserAvatarService;
