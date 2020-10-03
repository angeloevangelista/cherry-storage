import fs from 'fs';
import path from 'path';
import AWS, { AWSError } from 'aws-sdk';
import S3, { CreateBucketOutput, PutObjectOutput } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';

import S3Config from '@config/S3';
import filesUploadConfig from '@config/filesUpload';
import avatarsUploadConfig from '@config/avatarsUpload';

import IStorageProvider, {
  IDeleteFileDTO,
  ILoadFileDTO,
  ISaveFileDTO,
  IUpdateFileDTO,
} from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  public async saveFile({
    fileName,
    mimeType,
    s3Path,
  }: ISaveFileDTO): Promise<PromiseResult<S3.PutObjectOutput, AWSError>> {
    AWS.config.update({ region: S3Config.region });

    const s3 = new AWS.S3(S3Config);

    const fileContent = fs.readFileSync(
      path.join(filesUploadConfig.directory, fileName),
    );

    const params: S3.Types.PutObjectRequest = {
      Bucket: S3Config.name,
      Key: `${s3Path}/${fileName}`,
      Body: fileContent,
      ContentType: mimeType,
    };

    const response = await s3
      .putObject(params, async (err: Error) => {
        if (err) {
          throw err;
        }

        const filePath = path.join(filesUploadConfig.directory, fileName);

        try {
          await fs.promises.stat(filePath);
        } catch {
          return;
        }

        fs.promises.unlink(filePath);
      })
      .promise();

    return response;
  }

  public async updateFile({
    fileName,
    mimeType,
    s3Path,
    isAvatar,
  }: IUpdateFileDTO): Promise<PromiseResult<PutObjectOutput, AWSError>> {
    AWS.config.update({ region: S3Config.region });

    const s3 = new AWS.S3(S3Config);

    const pathToUse = isAvatar
      ? avatarsUploadConfig.directory
      : filesUploadConfig.directory;

    const fileContent = fs.readFileSync(path.join(pathToUse, fileName));

    const params: S3.Types.PutObjectRequest = {
      Bucket: S3Config.name,
      Key: `${s3Path}/${fileName}`,
      Body: fileContent,
      ContentType: mimeType,
    };

    const response = await s3
      .putObject(params, async (err: Error) => {
        if (err) {
          throw err;
        }

        const filePath = path.join(pathToUse, fileName);

        try {
          await fs.promises.stat(filePath);
        } catch {
          return;
        }

        await fs.promises.unlink(filePath);
      })
      .promise();

    return response;
  }

  public async deleteFile({
    fileName,
    s3Path,
  }: IDeleteFileDTO): Promise<PromiseResult<CreateBucketOutput, AWSError>> {
    AWS.config.update({ region: S3Config.region });

    const s3 = new AWS.S3(S3Config);

    const response = await s3
      .createBucket(
        {
          Bucket: S3Config.name,
        },
        async () => {
          s3.deleteObject(
            {
              Bucket: S3Config.name,
              Key: `${s3Path}/${fileName}`,
            },
            async (err) => {
              if (err) {
                throw err;
              }

              const filePath = path.join(filesUploadConfig.directory, fileName);

              try {
                await fs.promises.stat(filePath);
              } catch {
                return;
              }

              await fs.promises.unlink(filePath);
            },
          );
        },
      )
      .promise();

    return response;
  }

  public async loadFile({
    fileName,
    s3Path,
  }: ILoadFileDTO): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    AWS.config.update({ region: S3Config.region });

    const s3 = new AWS.S3(S3Config);

    const s3file = await s3
      .getObject({
        Bucket: S3Config.name,
        Key: `${s3Path}/${fileName}`,
      })
      .promise();

    return s3file;
  }
}

export default S3StorageProvider;
