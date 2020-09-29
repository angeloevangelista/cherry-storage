import { Router } from 'express';
import multer from 'multer';

import filesUploadConfig from '@config/filesUpload';

import File from '@modules/files/infra/typeorm/entities/File';

import CreateFileService from '@modules/files/services/CreateFileService';
import UpdateFileService from '@modules/files/services/UpdateFileService';
import DeleteFileService from '@modules/files/services/DeleteFileService';
import FindFileService from '@modules/files/services/FindFileService';

import FilesRepository from '@modules/files/infra/typeorm/repositories/FilesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const filesRouter = Router();
const upload = multer(filesUploadConfig);

filesRouter.get('/', async (request, response) => {
  const filesRepository = new FilesRepository();
  const usersRepository = new UsersRepository();
  const files = await filesRepository.ListByUserId(request.user.id);

  files.forEach((file) => {
    file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;
  });

  return response.json(files);
});

filesRouter.get('/:file_id', async (request, response) => {
  const filesRepository = new FilesRepository();
  const usersRepository = new UsersRepository();
  const { file_id } = request.params;

  const findFileService = new FindFileService(filesRepository, usersRepository);

  const file = await findFileService.execute({
    user_id: request.user.id,
    file_id,
  });

  return response.json(file);
});

filesRouter.post('/', upload.single('file'), async (request, response) => {
  const filesRepository = new FilesRepository();
  const usersRepository = new UsersRepository();
  const createFileService = new CreateFileService(
    filesRepository,
    usersRepository,
  );

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
    const filesRepository = new FilesRepository();
    const usersRepository = new UsersRepository();
    const { file_id } = request.params;

    const updateFileService = new UpdateFileService(
      filesRepository,
      usersRepository,
    );

    const file = await updateFileService.execute({
      existing_file_id: file_id,
      uploadedFile: request.file,
      user_id: request.user.id,
    });

    return response.json(file);
  },
);

filesRouter.delete('/:file_id', async (request, response) => {
  const filesRepository = new FilesRepository();
  const usersRepository = new UsersRepository();
  const { file_id } = request.params;

  const deleteFileService = new DeleteFileService(
    filesRepository,
    usersRepository,
  );

  await deleteFileService.execute({
    user_id: request.user.id,
    file_id,
  });

  return response.status(204).send();
});

export default filesRouter;
