import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import File from '@modules/files/infra/typeorm/entities/File';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  uploadedFile: {
    originalName: string;
    fileName: string;
    mimeType: string;
  };
}

@injectable()
class CreateFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, uploadedFile }: IRequest): Promise<File> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can upload files.');
    }

    const file = await this.filesRepository.create({
      user_id: user.id,
      name: uploadedFile.fileName,
      original_filename: uploadedFile.originalName,
      mime_type: uploadedFile.mimeType,
    });

    const {
      $response: { error },
    } = await this.storageProvider.saveFile({
      s3Path: 'storage',
      fileName: file.name,
      mimeType: file.mime_type,
    });

    if (error) {
      throw new AppError('An error occurred while saving file.');
    }

    file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;

    return file;
  }
}

export default CreateFileService;
