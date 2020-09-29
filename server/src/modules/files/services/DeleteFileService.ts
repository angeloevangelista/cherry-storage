import { validate } from 'uuid';

import DeleteFileS3Service from '@modules/files/infra/S3/DeleteFile';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';

interface Request {
  user_id: string;
  file_id: string;
}

class DeleteFileService {
  constructor(
    private filesRepository: IFilesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, file_id }: Request): Promise<void> {
    if (!validate(file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can delete files.');
    }

    const file = await this.filesRepository.findById(file_id);

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

    await this.filesRepository.delete(file);
  }
}

export default DeleteFileService;
