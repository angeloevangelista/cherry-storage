import { getRepository } from 'typeorm';

import User from '../models/User';
import File from '../models/File';

import UploadFileS3Service from './UploadFileS3Service';

import AppError from '../errors/AppError';

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
      filePath: 'storage',
      fileName: file.name,
      mimeType: file.mime_type,
    });

    return file;
  }
}

export default CreateFileService;
