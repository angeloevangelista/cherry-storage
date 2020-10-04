import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
const testsUploadFolder = path.resolve(__dirname, '..', '..', 'tests_upload');

export default {
  directory: tempFolder,
  test_directory: testsUploadFolder,
  storage: multer.diskStorage({
    destination: path.join(tempFolder),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
