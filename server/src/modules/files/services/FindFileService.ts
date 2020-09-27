import { validate } from 'uuid';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import File from '@modules/files/infra/typeorm/entities/File';

import AppError from '@shared/errors/AppError';

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

    if (file) {
      file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;
    }

    return file;
  }
}

export default FindFileService;
