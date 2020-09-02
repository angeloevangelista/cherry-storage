import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const filesFolder = path.resolve('..', '..', 'files');

export default {
  directory: path.join(filesFolder, 'avatars'),
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
