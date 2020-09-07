import { validate } from 'uuid';
import { getRepository } from 'typeorm';

import User from '../models/User';
import File from '../models/File';

import DeleteFileS3Service from './S3/DeleteFileS3Service';

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

    const deleteFileS3Service = new DeleteFileS3Service();

    deleteFileS3Service.execute({
      fileName: file.name,
      s3Path: 'storage',
    });

    await filesRepository.remove(file);
  }
}

export default DeleteFileService;
