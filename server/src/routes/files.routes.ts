import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import filesUploadConfig from '../config/filesUpload';

import File from '../models/File';

import CreateFileService from '../services/CreateFileService';
import UpdateFileService from '../services/UpdateFileService';
import DeleteFileService from '../services/DeleteFileService';
import FindFileService from '../services/FindFileService';

const filesRouter = Router();
const upload = multer(filesUploadConfig);

filesRouter.get('/', async (request, response) => {
  const filesRepository = getRepository(File);

  const files = await filesRepository.find({
    where: {
      user_id: request.user.id,
    },
  });

  files.forEach((file) => {
    file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;
  });

  return response.json(files);
});

filesRouter.get('/:file_id', async (request, response) => {
  const { file_id } = request.params;
  // const { download } = request.query;

  const findFileService = new FindFileService();

  const file = await findFileService.execute({
    user_id: request.user.id,
    file_id,
  });

  // if (download) {
  //   file.mime_type = 'application/octet-stream';
  // }

  return response.json(file);
});

filesRouter.post('/', upload.single('file'), async (request, response) => {
  const createFileService = new CreateFileService();

  const file = await createFileService.execute({
    user_id: request.user.id,
    uploadedFile: {
      fileName: request.file.filename,
      originalName: request.file.originalname,
      mimeType: request.file.mimetype,
    },
  });

  return response.status(201).json(file);
});

filesRouter.put(
  '/:file_id',
  upload.single('file'),
  async (request, response) => {
    const { file_id } = request.params;

    const updateFileService = new UpdateFileService();

    const file = await updateFileService.execute({
      existing_file_id: file_id,
      uploadedFile: request.file,
      user_id: request.user.id,
    });

    return response.json(file);
  },
);

filesRouter.delete('/:file_id', async (request, response) => {
  const { file_id } = request.params;

  const deleteFileService = new DeleteFileService();

  await deleteFileService.execute({
    user_id: request.user.id,
    file_id,
  });

  return response.status(204).send();
});

export default filesRouter;
