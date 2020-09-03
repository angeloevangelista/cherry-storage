import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const storageFolder = path.resolve(__dirname, '..', '..', 'files', 'storage');

export default {
  directory: storageFolder,
  storage: multer.diskStorage({
    destination: path.join(storageFolder),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
