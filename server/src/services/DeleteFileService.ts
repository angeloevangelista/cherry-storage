import fs from 'fs';
import path from 'path';
import { validate } from 'uuid';
import { getRepository } from 'typeorm';

import filesUploadConfig from '../config/filesUpload';

import User from '../models/User';
import File from '../models/File';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  file_id: string;
}

class DeleteFileService {
  async execute({ user_id, file_id }: Request): Promise<void> {
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

    if (!file) {
      throw new AppError('File not found');
    }

    if (file.user_id !== user_id) {
      throw new AppError('You can delete only your own files.');
    }

    try {
      const filePath = path.join(filesUploadConfig.directory, file.name);
      const fileExists = await fs.promises.stat(filePath);

      if (fileExists) {
        await fs.promises.unlink(filePath);
      }
    } catch (error) {
      console.warn('An error occurred while deleting file ❌');
      console.warn(error);
    }

    await filesRepository.remove(file);
  }
}

export default DeleteFileService;
