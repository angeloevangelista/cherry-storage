import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import DeleteFileS3Service from '@modules/files/infra/S3/DeleteFile';
import UploadUserAvatarS3Service from '@modules/files/infra/S3/UploadUserAvatar';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
  avatarMimeType: 'image/jpeg' | 'image/png';
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
    avatarMimeType,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.update(user);

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
