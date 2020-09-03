import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import filesUploadConfig from '../config/filesUpload';

import File from '../models/File';

import CreateFileService from '../services/CreateFileService';

const filesRouter = Router();
const upload = multer(filesUploadConfig);

filesRouter.get('/', async (request, response) => {
  const filesRepository = getRepository(File);

  const files = await filesRepository.find({
    where: {
      user_id: request.user.id,
    },
  });

  return response.json(files);
});

filesRouter.post('/', upload.single('file'), async (request, response) => {
  const createFileService = new CreateFileService();

  const file = await createFileService.execute({
    user_id: request.user.id,
    uploadedFile: {
      filename: request.file.filename,
      originalname: request.file.originalname,
    },
  });

  return response.status(201).json(file);
});

export default filesRouter;
