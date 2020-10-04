import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import FilesController from '../controllers/FilesController';

const filesRouter = Router();
const upload = multer(uploadConfig);
const filesController = new FilesController();

filesRouter.get('/', filesController.index);

filesRouter.get('/:file_id', filesController.show);

filesRouter.post('/', upload.single('file'), filesController.create);

filesRouter.put('/:file_id', upload.single('file'), filesController.update);

filesRouter.delete('/:file_id', filesController.delete);

export default filesRouter;
