import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

import S3Config from '../config/S3';

interface DeleteFileS3Params {
  filePath: string;
  fileName: string;
}

AWS.config.update({ region: S3Config.region });

const s3 = new AWS.S3(S3Config);

const s3delete = (params: S3.Types.DeleteObjectRequest) => {
  return new Promise(() => {
    s3.createBucket(
      {
        Bucket: S3Config.name,
      },
      () => {
        s3.deleteObject(params, (err) => {
          if (err) {
            throw err;
          }
        });
      },
    );
  });
};

class DeleteFileS3Service {
  execute({ filePath, fileName }: DeleteFileS3Params): void {
    const params: S3.Types.PutObjectRequest = {
      Bucket: S3Config.name,
      Key: `${filePath}/${fileName}`,
    };

    s3delete(params);
  }
}

export default DeleteFileS3Service;
