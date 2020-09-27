import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import File from '@modules/files/infra/typeorm/entities/File';

import UploadFileS3Service from '@modules/files/infra/S3/UploadFile';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  uploadedFile: {
    originalName: string;
    fileName: string;
    mimeType: string;
  };
}

class CreateFileService {
  async execute({ user_id, uploadedFile }: Request): Promise<File> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can upload files.');
    }

    const filesRepository = getRepository(File);

    const file = filesRepository.create({
      user_id: user.id,
      name: uploadedFile.fileName,
      original_filename: uploadedFile.originalName,
      mime_type: uploadedFile.mimeType,
    });

    await filesRepository.save(file);

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
