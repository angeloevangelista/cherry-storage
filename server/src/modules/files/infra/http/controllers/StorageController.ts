import { Request, Response } from 'express';

import { container } from 'tsyringe';

import GetFileService from '@modules/files/services/GetFileService';

class StorageController {
  public async find(request: Request, response: Response): Promise<void> {
    const { file_id } = request.params;
    const getFileService = container.resolve(GetFileService);

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
  }
}

export default StorageController;
