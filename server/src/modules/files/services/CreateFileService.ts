import AppError from '@shared/errors/AppError';

import UploadFileS3Service from '@modules/files/infra/S3/UploadFile';

import File from '@modules/files/infra/typeorm/entities/File';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';

interface IRequest {
  user_id: string;
  uploadedFile: {
    originalName: string;
    fileName: string;
    mimeType: string;
  };
}

class CreateFileService {
  constructor(
    private filesRepository: IFilesRepository,
    private usersRepository: IUsersRepository,
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

    const uploadFileS3Service = new UploadFileS3Service();

    uploadFileS3Service.execute({
      s3Path: 'storage',
      fileName: file.name,
      mimeType: file.mime_type,
    });

    file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;

    return file;
  }
}

export default CreateFileService;
