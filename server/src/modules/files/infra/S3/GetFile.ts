import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

import { PromiseResult } from 'aws-sdk/lib/request';
import S3Config from '@config/S3';

interface IGetFileParams {
  s3Path: string;
  fileName: string;
}

AWS.config.update({ region: S3Config.region });

const s3 = new AWS.S3(S3Config);

class GetFile {
  async execute({
    s3Path,
    fileName,
  }: IGetFileParams): Promise<PromiseResult<S3.GetObjectOutput, AWS.AWSError>> {
    const s3file = await s3
      .getObject({
        Bucket: S3Config.name,
        Key: `${s3Path}/${fileName}`,
      })
      .promise();

    return s3file;
  }
}

export default GetFile;
