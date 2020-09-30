import { Router } from 'express';
import multer from 'multer';

import filesUploadConfig from '@config/filesUpload';

import FilesController from '../controllers/FilesController';

const filesRouter = Router();
const upload = multer(filesUploadConfig);
const filesController = new FilesController();

filesRouter.get('/', filesController.list);

filesRouter.get('/:file_id', filesController.find);

filesRouter.post('/', upload.single('file'), filesController.create);

filesRouter.put(
  '/:file_id',
  upload.single('file'),
  filesController.update,
);

filesRouter.delete('/:file_id', filesController.destroy);

export default filesRouter;
