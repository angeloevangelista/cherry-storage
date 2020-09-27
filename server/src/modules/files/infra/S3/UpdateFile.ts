import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

import S3Config from '@config/S3';
import filesUploadConfig from '@config/filesUpload';

interface UpdateFileParams {
  s3Path: string;
  fileName: string;
  mimeType: string;
}

AWS.config.update({ region: S3Config.region });

const s3 = new AWS.S3(S3Config);

class UpdateFile {
  execute({ s3Path, fileName, mimeType }: UpdateFileParams): void {
    const fileContent = fs.readFileSync(
      path.join(filesUploadConfig.directory, fileName),
    );

    const params: S3.Types.PutObjectRequest = {
      Bucket: S3Config.name,
      Key: `${s3Path}/${fileName}`,
      Body: fileContent,
      ContentType: mimeType,
    };

    s3.upload(params, async (err: Error) => {
      if (err) {
        throw err;
      }

      const filePath = path.join(filesUploadConfig.directory, fileName);

      await fs.promises.unlink(filePath);
    });
  }
}

export default UpdateFile;
