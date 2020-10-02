import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

import S3Config from '@config/S3';
import filesUploadConfig from '@config/filesUpload';

interface IDeleteFileParams {
  s3Path: string;
  fileName: string;
}

AWS.config.update({ region: S3Config.region });

const s3 = new AWS.S3(S3Config);

const s3delete = (params: S3.Types.DeleteObjectRequest, fileName: string) => {
  return new Promise(() => {
    s3.createBucket(
      {
        Bucket: S3Config.name,
      },
      async () => {
        s3.deleteObject(params, async (err) => {
          if (err) {
            throw err;
          }

          const filePath = path.join(filesUploadConfig.directory, fileName);

          await fs.promises.unlink(filePath);
        });
      },
    );
  });
};

class DeleteFile {
  execute({ s3Path, fileName }: IDeleteFileParams): void {
    const params: S3.Types.PutObjectRequest = {
      Bucket: S3Config.name,
      Key: `${s3Path}/${fileName}`,
    };

    s3delete(params, fileName);
  }
}

export default DeleteFile;
