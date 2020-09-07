import { getRepository } from 'typeorm';

import User from '../models/User';

import DeleteFileS3Service from './S3/DeleteFileS3Service';
import UploadUserAvatarS3Service from './S3/UploadUserAvatarS3Service';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
  avatarMimeType: string;
}

const validMimetypes = ['image/jpeg', 'image/png'];

class UpdateUserAvatarService {
  async execute({
    user_id,
    avatarFilename,
    avatarMimeType,
  }: Request): Promise<User> {
    if (!validMimetypes.includes(avatarMimeType)) {
      throw new AppError('Invalid image format.');
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const deleteFileS3Service = new DeleteFileS3Service();

      deleteFileS3Service.execute({
        s3Path: 'avatars',
        fileName: user.avatar,
      });
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    const uploadUserAvatarS3Service = new UploadUserAvatarS3Service();

    uploadUserAvatarS3Service.execute({
      s3Path: 'avatars',
      fileName: user.avatar,
      mimeType: avatarMimeType,
    });

    user.avatar_url = `${process.env.AWS_S3_URL}/avatars/${user.avatar}`;

    return user;
  }
}

export default UpdateUserAvatarService;
