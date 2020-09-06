import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

import S3Config from '../../config/S3';
import avatarsUploadConfig from '../../config/avatarsUpload';

interface UploadUserAvatarS3Params {
  filePath: string;
  fileName: string;
  mimeType: string;
}

AWS.config.update({ region: S3Config.region });

const s3 = new AWS.S3(S3Config);

class UploadUserAvatarS3Service {
  execute({ filePath, fileName, mimeType }: UploadUserAvatarS3Params): void {
    const fileContent = fs.readFileSync(
      path.join(avatarsUploadConfig.directory, fileName),
    );

    const params: S3.Types.PutObjectRequest = {
      Bucket: S3Config.name,
      Key: `${filePath}/${fileName}`,
      Body: fileContent,
      ContentType: mimeType,
    };

    s3.upload(params, (err: Error) => {
      if (err) {
        throw err;
      }
    });
  }
}

export default UploadUserAvatarS3Service;
