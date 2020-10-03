import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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
      const {
        $response: { error: deleteFileError },
      } = await this.storageProvider.deleteFile({
        s3Path: 'avatars',
        fileName: user.avatar,
      });

      if (deleteFileError) {
        throw new AppError('An error occurred while deleting file.');
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.update(user);

    if (user.avatar) {
      const {
        $response: { error: updateFileError },
      } = await this.storageProvider.updateFile({
        s3Path: 'avatars',
        fileName: user.avatar,
        mimeType: avatarMimeType,
        isAvatar: true,
      });

      if (updateFileError) {
        throw new AppError('An error ocurred while updating avatar.');
      }
    } else {
      const {
        $response: { error: saveFileError },
      } = await this.storageProvider.saveFile({
        s3Path: 'avatars',
        fileName: user.avatar,
        mimeType: avatarMimeType,
      });

      if (saveFileError) {
        throw new AppError('An error ocurred while saving avatar.');
      }
    }

    user.avatar_url = `${process.env.AWS_S3_URL}/avatars/${user.avatar}`;

    return user;
  }
}

export default UpdateUserAvatarService;
