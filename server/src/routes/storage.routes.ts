import path from 'path';
import { Router } from 'express';

import filesUploadConfig from '../config/filesUpload';

import FindFileService from '../services/FindFileService';

const storageRouter = Router();

storageRouter.get('/:file_id', async (request, response) => {
  const { file_id } = request.params;

  const findFileService = new FindFileService();

  const file = await findFileService.execute({
    user_id: request.user.id,
    file_id,
  });

  if (!file) {
    return response.status(404).send();
  }

  const filePath = path.join(filesUploadConfig.directory, file.name);

  return response.sendFile(filePath);
});

export default storageRouter;
