import AWS, { AWSError } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { getRepository } from 'typeorm';
import { validate } from 'uuid';

import S3Config from '../config/S3';
import AppError from '../errors/AppError';
import User from '../models/User';
import File from '../models/File';
import GetFileS3Service from './S3/GetFileS3Service';

interface Request {
  file_id: string;
  user_id: string;
}

AWS.config.update({
  region: S3Config.region,
  accessKeyId: S3Config.accessKeyId,
  secretAccessKey: S3Config.secretAccessKey,
});

class GetFileService {
  async execute({
    file_id,
    user_id,
  }: Request): Promise<PromiseResult<GetObjectOutput, AWSError>> {
    if (!validate(file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can delete files.');
    }

    const filesRepository = getRepository(File);

    const file = await filesRepository.findOne(file_id);

    const getFileS3Service = new GetFileS3Service();

    const s3file = await getFileS3Service.execute({
      fileName: file.name,
      s3Path: 'storage',
    });

    s3file.ETag = file.original_filename;

    return s3file;
  }
}

export default GetFileService;
