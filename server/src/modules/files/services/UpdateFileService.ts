import { validate } from 'uuid';
import { injectable, inject } from 'tsyringe';

import File from '@modules/files/infra/typeorm/entities/File';

import UpdateFileS3Service from '@modules/files/infra/S3/UpdateFile';
import DeleteFileS3Service from '@modules/files/infra/S3/DeleteFile';

import AppError from '@shared/errors/AppError';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import IUsersRepositories from '@modules/users/repositories/IUsersRepository';

interface Request {
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
  ) {}

  public async execute({
    user_id,
    existing_file_id,
    uploadedFile,
  }: Request): Promise<File> {
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

    const updateFileS3Service = new UpdateFileS3Service();

    updateFileS3Service.execute({
      s3Path: 'storage',
      fileName: uploadedFile.filename,
      mimeType: uploadedFile.mimetype,
    });

    if (uploadedFile.filename !== file.name) {
      const deleteFileS3Service = new DeleteFileS3Service();

      deleteFileS3Service.execute({
        s3Path: 'storage',
        fileName: file.name,
      });
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
