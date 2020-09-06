import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const avatarsFolder = path.resolve(__dirname, '..', '..', 'files', 'avatars');

export default {
  directory: avatarsFolder,
  storage: multer.diskStorage({
    destination: path.join(avatarsFolder),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
