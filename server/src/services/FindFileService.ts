import { validate } from 'uuid';
import { getRepository } from 'typeorm';

import User from '../models/User';
import File from '../models/File';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  file_id: string;
}

class FindFileService {
  async execute({ user_id, file_id }: Request): Promise<File> {
    if (!validate(file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can delete files.');
    }

    const filesRepository = getRepository(File);

    const file = await filesRepository.findOne(file_id);

    return file;
  }
}

export default FindFileService;
