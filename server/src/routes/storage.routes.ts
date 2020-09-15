import { Router } from 'express';

import GetFileService from '../services/GetFileService';

const storageRouter = Router();

storageRouter.get('/:file_id', async (request, response) => {
  const { file_id } = request.params;
  const getFileService = new GetFileService();

  const file = await getFileService.execute({
    file_id,
    user_id: request.user.id,
  });

  response.writeHead(200, {
    'Content-Type': file.ContentType,
    'Content-disposition': `attachment;filename=${file.ETag}`,
    'Content-Length': file.ContentLength,
  });

  response.write(file.Body, 'binary');

  return response.end(undefined, 'binary');
});

export default storageRouter;
