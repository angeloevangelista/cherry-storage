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
  existing_file_id: string;
  uploadedFile: {
    originalname: string;
    filename: string;
  };
}

class UpdateFileService {
  async execute({
    user_id,
    existing_file_id,
    uploadedFile,
  }: Request): Promise<File> {
    if (!validate(existing_file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update files.');
    }

    const filesRepository = getRepository(File);

    const file = await filesRepository.findOne(existing_file_id);

    if (!file) {
      throw new AppError('File not found');
    }

    if (file.user_id !== user_id) {
      throw new AppError('You can update only your own files.');
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

    file.name = uploadedFile.filename;
    file.original_filename = uploadedFile.originalname;

    await filesRepository.save(file);

    return file;
  }
}

export default UpdateFileService;
