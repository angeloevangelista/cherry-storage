import { injectable, inject } from 'tsyringe';
import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  file_id: string;
}

@injectable()
class DeleteFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, file_id }: IRequest): Promise<void> {
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

    const {
      $response: { error },
    } = await this.storageProvider.deleteFile({
      fileName: file.name,
      s3Path: 'storage',
    });

    if (error) {
      throw new AppError('An error occurred while deleting file.');
    }

    await this.filesRepository.delete(file);
  }
}

export default DeleteFileService;
