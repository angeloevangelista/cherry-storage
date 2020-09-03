import { getRepository } from 'typeorm';

import User from '../models/User';
import File from '../models/File';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  uploadedFile: {
    originalname: string;
    filename: string;
  };
}

class CreateFileService {
  async execute({ user_id, uploadedFile }: Request): Promise<File> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('only authenticated users can upload files.');
    }

    const filesRepository = getRepository(File);

    const file = filesRepository.create({
      user_id: user.id,
      name: uploadedFile.filename,
      original_filename: uploadedFile.originalname,
    });

    await filesRepository.save(file);

    return file;
  }
}

export default CreateFileService;
