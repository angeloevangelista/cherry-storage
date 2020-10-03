import AWS, { AWSError } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { validate } from 'uuid';
import { injectable, inject } from 'tsyringe';

import S3Config from '@config/S3';
import AppError from '@shared/errors/AppError';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  file_id: string;
  user_id: string;
}

AWS.config.update({
  region: S3Config.region,
  accessKeyId: S3Config.accessKeyId,
  secretAccessKey: S3Config.secretAccessKey,
});

@injectable()
class GetFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    file_id,
    user_id,
  }: IRequest): Promise<PromiseResult<GetObjectOutput, AWSError>> {
    if (!validate(file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can delete files.');
    }

    const file = await this.filesRepository.findById(file_id);

    const s3file = await this.storageProvider.loadFile({
      fileName: file.name,
      s3Path: 'storage',
    });

    s3file.ETag = file.original_filename;

    return s3file;
  }
}

export default GetFileService;
