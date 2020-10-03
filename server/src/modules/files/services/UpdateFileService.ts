import { validate } from 'uuid';
import { injectable, inject } from 'tsyringe';

import File from '@modules/files/infra/typeorm/entities/File';

import AppError from '@shared/errors/AppError';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import IUsersRepositories from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  existing_file_id: string;
  uploadedFile: {
    originalname: string;
    filename: string;
    mimetype: string;
  };
}

@injectable()
class UpdateFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    existing_file_id,
    uploadedFile,
  }: IRequest): Promise<File> {
    if (!validate(existing_file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update files.');
    }

    const file = await this.filesRepository.findById(existing_file_id);

    if (!file) {
      throw new AppError('File not found');
    }

    if (file.user_id !== user_id) {
      throw new AppError('You can update only your own files.');
    }

    const {
      $response: { error: updateFileError },
    } = await this.storageProvider.updateFile({
      s3Path: 'storage',
      fileName: uploadedFile.filename,
      mimeType: uploadedFile.mimetype,
    });

    if (updateFileError) {
      throw new AppError('An error occurred while updating file.');
    }

    if (uploadedFile.filename !== file.name) {
      const {
        $response: { error: deleteFileError },
      } = await this.storageProvider.deleteFile({
        s3Path: 'storage',
        fileName: file.name,
      });

      if (deleteFileError) {
        throw new AppError('An error occurred while deleting file.');
      }
    }

    file.name = uploadedFile.filename;
    file.mime_type = uploadedFile.mimetype;
    file.original_filename = uploadedFile.originalname;

    await this.filesRepository.update(file);

    file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;

    return file;
  }
}

export default UpdateFileService;
